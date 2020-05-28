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
        };
    },
    render(h) {
        const slots = this.$slots.default;
        return h(this.element, {}, slots);
    },
    updated() {
        this.$nextTick(function () {
            window.selectableInstance = new Selectable(this.options);
            this._selectable = window.selectableInstance;
            this._selectable.on('end', this.end);
            this._selectable.on('selecteditem', this.selectItem);
        })
    },
    beforeDestroy() {
        if (this._selectable !== undefined) this._selectable.destroy();
    },
    methods: {
        selectItem(item) {
            console.log(item);
        }
    },
}