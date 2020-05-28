import Selectable from 'selectable.js'

export default {
    name: 'Selectable',
    props: {
        options: Object,
        list: {
            type: Array,
            required: false,
            default: null
        },
        value: {
            type: Array,
            required: false,
            default: null
        },
        end: {
            type: Function,
            default: () => {},
        },
        element: {
            type: String,
            default: 'div',
            required: true,
        },
    },
    data() {
        return {
            transitionMode: false,
            noneFunctionalComponentMode: false,
            _selectable: false,
        };
    },
    render(h) {
        const slots = this.$slots.default;
        return h(this.element, {}, slots);
    },
    created() {
        if (this.list !== null && this.value !== null) {
            console.error(
                "Value and list props are mutually exclusive! Please set one or another."
            );
        }

        if (this.options !== undefined) {
            console.warn(
                "Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props"
            );
        }
    },
    mounted() {
        this._selectable = new Selectable(this.options);
        this._selectable.on('end', this.end);
        this._selectable.on('selecteditem', this.selctItem);
    },
    beforeDestroy() {
        if (this._selectable !== false) this._selectable.destroy();
    },
    watch: {
        options: {
            handler(newOptionValue) {
                this.updateOptions(newOptionValue);
            },
            deep: true
        },
    },
    methods: {
        updateOptions(newOptionValue) {
            for (var property in newOptionValue) {
                const value = camelize(property);
                this._selectable.option(value, newOptionValue[property]);
            }
        },
        selectItem(item) {
            console.log(item);
        }
    },
}