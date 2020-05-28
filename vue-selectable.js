import Selectable from 'selectable.js'

export default {
    name: 'Selectable',
    props: {
        options: Object,
        value: {
            type: Array,
            required: false,
            default: null
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
    watch: {
        value: {
            deep: true,
            handler() {
                const need = this.value.filter(item => item.selected);
                const needDeselect = this.value.filter(item => !item.selected);
                const items = [];
                const itemsDeselect = [];
                for (let i = 0; i < need.length; i += 1) {
                    items.push(document.querySelectorAll(`td[data-key='${need[i].key}']`));
                }
                for (let i = 0; i < needDeselect.length; i += 1) {
                    itemsDeselect.push(document.querySelectorAll(`td[data-key='${needDeselect[i].key}']`));
                }
                console.log(need, items);
                this._selectable.select(items);
                this._selectable.deselect(itemsDeselect);
            }
        },
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
        },
        end(e, selected, unselected) {
            const items = this._selectable.getSelectedItems();
            console.log(selected, unselected);
            const storeSelected = [];
            for (let i = 0; i < items.length; i += 1) {
                console.log(items[i].node.dataset.key);
                storeSelected.push(items[i].node.dataset.key);
            }
            if (storeSelected.length) {
                const need = this.value.filter(item => storeSelected.indexOf(item.key) !== -1);
                for (let i = 0; i < need.length; i += 1) {
                    need[i].selected = true;
                }
                this.$emit('end', storeSelected);
            }
        }
    },
}