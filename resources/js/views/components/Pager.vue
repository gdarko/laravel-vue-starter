<template>
    <div class="flex flex-col items-center">
        <div class="flex text-gray-700">
            <div v-if="firstLastButton" :class="['w-16 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer' ]">
                <a @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="['w-16 h-10 flex justify-center uppercase text-xs items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]" tabindex="0" v-html="firstButtonText"></a>
            </div>
            <div v-if="!(firstPageSelected() && hidePrevNext)" :class="['w-10 h-10 ml-2 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer' ]">
                <a @click="prevPage()" @keyup.enter="prevPage()" :class="['w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]" tabindex="0" v-html="prevText"></a>
            </div>
            <div class="flex h-10 ml-2 mr-2 font-medium rounded-full bg-gray-200">
                <template v-for="page in pages">
                    <a v-if="page.disabled" :class="['w-10 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full', page.selected ? activeClass : '', disabledClass]" tabindex="0">{{
                            '...'
                        }}</a>
                    <a v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)" :class="['w-10 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full', page.selected ? activeClass : '']" tabindex="0">{{
                            page.content
                        }}</a>
                </template>
            </div>
            <div v-if="!(lastPageSelected() && hidePrevNext)" :class="['w-10 h-10 mr-2 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', firstLastButton ? 'w-30' : 'w-10' ]">
                <a @click="nextPage()" @keyup.enter="nextPage()" :class="['w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]" tabindex="0" v-html="nextText"></a>
            </div>
            <div v-if="firstLastButton" :class="['w-16 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', firstLastButton ? 'w-30' : 'w-10' ]">
                <a @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="['w-16 h-10 flex justify-center uppercase text-xs items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]" tabindex="0" v-html="lastButtonText"></a>
            </div>
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
        prevText: {
            type: String,
            default: ' <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-6 h-6">\n' +
                '<polyline points="15 18 9 12 15 6"></polyline>\n' +
                '</svg>'
        },
        nextText: {
            type: String,
            default: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-6 h-6">\n' +
                '<polyline points="9 18 15 12 9 6"></polyline>\n' +
                '</svg>'
        },
        activeClass: {
            type: String,
            default: 'bg-theme-600 text-white'
        },
        disabledClass: {
            type: String,
            default: 'disabled'
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

                // 1st - loop thru low end of margin pages
                for (let i = 0; i < props.marginPages; i++) {
                    setPageItem(i);
                }

                // 2nd - loop thru selected range
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

                // Check if there is breakView in the left of selected range
                if (selectedRangeLow > props.marginPages) {
                    setBreakView(selectedRangeLow - 1)
                }

                // Check if there is breakView in the right of selected range
                if (selectedRangeHigh + 1 < props.pageCount - props.marginPages) {
                    setBreakView(selectedRangeHigh + 1)
                }

                // 3rd - loop thru high end of margin pages
                for (let i = props.pageCount - 1; i >= props.pageCount - props.marginPages; i--) {
                    setPageItem(i);
                }
            }
            return items
        })

        function handlePageSelected(newSelected) {
            if (selected.value === newSelected) {
                return
            }
            innerValue = newSelected
            emit('input', innerValue)
            if (props.pageChanged) {
                props.pageChanged(innerValue)
            }
        }

        function prevPage() {
            if (selected.value <= 1) {
                return
            }
            handlePageSelected(selected.value - 1)
        }

        function nextPage() {
            if (selected.value >= props.pageCount) {
                return
            }
            handlePageSelected(selected.value + 1)
        }

        function firstPageSelected() {
            return selected.value === 1
        }

        function lastPageSelected() {
            return (selected.value === props.pageCount) || (props.pageCount === 0)
        }

        function selectFirstPage() {
            if (selected.value <= 1) {
                return
            }

            handlePageSelected(1)
        }

        function selectLastPage() {
            if (selected.value >= props.pageCount) {
                return
            }
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
