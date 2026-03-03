<template>
    <div class="flex justify-center">
        <div class="join">
            <button v-if="firstLastButton" class="join-item btn btn-sm" :disabled="firstPageSelected()" @click="selectFirstPage()" v-html="firstButtonText"></button>
            <button v-if="!(firstPageSelected() && hidePrevNext)" class="join-item btn btn-sm" :disabled="firstPageSelected()" @click="prevPage()">«</button>
            <template v-for="page in pages">
                <button v-if="page.disabled" class="join-item btn btn-sm btn-disabled">...</button>
                <button v-else class="join-item btn btn-sm" :class="{'btn-primary': page.selected}" @click="handlePageSelected(page.index + 1)">{{ page.content }}</button>
            </template>
            <button v-if="!(lastPageSelected() && hidePrevNext)" class="join-item btn btn-sm" :disabled="lastPageSelected()" @click="nextPage()">»</button>
            <button v-if="firstLastButton" class="join-item btn btn-sm" :disabled="lastPageSelected()" @click="selectLastPage()" v-html="lastButtonText"></button>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";

export default defineComponent( {
    name: 'Pager',
    props: {
        value: {
            type: Number
        },
        pageCount: {
            type: Number,
            required: true
        },
        forcePage: {
            type: Number
        },
        pageChanged: {
            type: Function,
            default: () => {
            }
        },
        pageRange: {
            type: Number,
            default: 3
        },
        marginPages: {
            type: Number,
            default: 1
        },
        firstLastButton: {
            type: Boolean,
            default: false
        },
        firstButtonText: {
            type: String,
            default: 'First'
        },
        lastButtonText: {
            type: String,
            default: 'Last'
        },
        hidePrevNext: {
            type: Boolean,
            default: false
        }
    },
    onBeforeUpdate(props) {
        if (props.forcePage === undefined) return
        if (props.forcePage !== props.selected) {
            props.selected = props.forcePage
        }
    },
    setup(props, {emit}) {
        let innerValue = ref(1);
        const selected = computed({
            get: function () {
                return props.value || innerValue
            },
            set: function (newValue) {
                innerValue = newValue
            }
        });

        const pages = computed(() => {
            let items = {}
            if (props.pageCount <= props.pageRange) {
                for (let index = 0; index < props.pageCount; index++) {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (selected.value - 1)
                    }
                    items[index] = page
                }
            } else {
                const halfPageRange = Math.floor(props.pageRange / 2)

                let setPageItem = index => {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (selected.value - 1)
                    }
                    items[index] = page
                }

                let setBreakView = index => {
                    let breakView = {
                        disabled: true,
                        breakView: true
                    }
                    items[index] = breakView
                }

                for (let i = 0; i < props.marginPages; i++) {
                    setPageItem(i);
                }

                let selectedRangeLow = 0;
                if (selected.value - halfPageRange > 0) {
                    selectedRangeLow = selected.value - 1 - halfPageRange;
                }

                let selectedRangeHigh = selectedRangeLow + props.pageRange - 1;
                if (selectedRangeHigh >= props.pageCount) {
                    selectedRangeHigh = props.pageCount - 1;
                    selectedRangeLow = selectedRangeHigh - props.pageRange + 1;
                }

                for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= props.pageCount - 1; i++) {
                    setPageItem(i);
                }

                if (selectedRangeLow > props.marginPages) {
                    setBreakView(selectedRangeLow - 1)
                }

                if (selectedRangeHigh + 1 < props.pageCount - props.marginPages) {
                    setBreakView(selectedRangeHigh + 1)
                }

                for (let i = props.pageCount - 1; i >= props.pageCount - props.marginPages; i--) {
                    setPageItem(i);
                }
            }
            return items
        })

        function handlePageSelected(newSelected) {
            if (selected.value === newSelected) return
            innerValue = newSelected
            emit('input', innerValue)
            if (props.pageChanged) {
                props.pageChanged(innerValue)
            }
        }

        function prevPage() {
            if (selected.value <= 1) return
            handlePageSelected(selected.value - 1)
        }

        function nextPage() {
            if (selected.value >= props.pageCount) return
            handlePageSelected(selected.value + 1)
        }

        function firstPageSelected() {
            return selected.value === 1
        }

        function lastPageSelected() {
            return (selected.value === props.pageCount) || (props.pageCount === 0)
        }

        function selectFirstPage() {
            if (selected.value <= 1) return
            handlePageSelected(1)
        }

        function selectLastPage() {
            if (selected.value >= props.pageCount) return
            handlePageSelected(props.pageCount)
        }

        return {
            innerValue,
            selected,
            pages,
            handlePageSelected,
            selectFirstPage,
            selectLastPage,
            firstPageSelected,
            lastPageSelected,
            prevPage,
            nextPage
        }
    }
});
</script>
