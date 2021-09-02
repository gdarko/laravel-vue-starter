<template>
    <div class="flex flex-col items-center">
        <div class="flex text-gray-700">
            <div v-if="firstLastButton" :class="['w-16 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer' ]">
                <a @click="selectFirstPage()"
                   @keyup.enter="selectFirstPage()"
                   :class="['w-16 h-10 flex justify-center uppercase text-xs items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]"
                   tabindex="0"
                   v-html="firstButtonText"></a>
            </div>
            <div v-if="!(firstPageSelected() && hidePrevNext)" :class="['w-10 h-10 ml-2 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer' ]">
                <a @click="prevPage()"
                   @keyup.enter="prevPage()"
                   :class="['w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]"
                   tabindex="0"
                   v-html="prevText"></a>
            </div>
            <div class="flex h-10 ml-2 mr-2 font-medium rounded-full bg-gray-200">
                <template v-for="page in pages">
                    <a v-if="page.disabled"
                       :class="['w-10 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full', page.selected ? activeClass : '', disabledClass]"
                       tabindex="0">{{ '...' }}</a>
                    <a v-else
                       @click="handlePageSelected(page.index + 1)"
                       @keyup.enter="handlePageSelected(page.index + 1)"
                       :class="['w-10 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full', page.selected ? activeClass : '']"
                       tabindex="0">{{ page.content }}</a>
                </template>
            </div>
            <div v-if="!(lastPageSelected() && hidePrevNext)" :class="['w-10 h-10 mr-2 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', firstLastButton ? 'w-30' : 'w-10' ]">
                <a @click="nextPage()" @keyup.enter="nextPage()"
                   :class="['w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]"
                   tabindex="0"
                   v-html="nextText"></a>
            </div>
            <div v-if="firstLastButton" :class="['w-16 h-10 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer', firstLastButton ? 'w-30' : 'w-10' ]">
                <a @click="selectLastPage()"
                   @keyup.enter="selectLastPage()"
                   :class="['w-16 h-10 flex justify-center uppercase text-xs items-center rounded-full bg-gray-200 cursor-pointer', (firstPageSelected() ? disabledClass : '') ]"
                   tabindex="0"
                   v-html="lastButtonText"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
            default: 'bg-green-400 text-white'
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
    beforeUpdate() {
        if (this.forcePage === undefined) return
        if (this.forcePage !== this.selected) {
            this.selected = this.forcePage
        }
    },
    computed: {
        selected: {
            get: function () {
                return this.value || this.innerValue
            },
            set: function (newValue) {
                this.innerValue = newValue
            }
        },
        pages: function () {
            let items = {}
            if (this.pageCount <= this.pageRange) {
                for (let index = 0; index < this.pageCount; index++) {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (this.selected - 1)
                    }
                    items[index] = page
                }
            } else {
                const halfPageRange = Math.floor(this.pageRange / 2)

                let setPageItem = index => {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (this.selected - 1)
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
                for (let i = 0; i < this.marginPages; i++) {
                    setPageItem(i);
                }

                // 2nd - loop thru selected range
                let selectedRangeLow = 0;
                if (this.selected - halfPageRange > 0) {
                    selectedRangeLow = this.selected - 1 - halfPageRange;
                }

                let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
                if (selectedRangeHigh >= this.pageCount) {
                    selectedRangeHigh = this.pageCount - 1;
                    selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
                }

                for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
                    setPageItem(i);
                }

                // Check if there is breakView in the left of selected range
                if (selectedRangeLow > this.marginPages) {
                    setBreakView(selectedRangeLow - 1)
                }

                // Check if there is breakView in the right of selected range
                if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
                    setBreakView(selectedRangeHigh + 1)
                }

                // 3rd - loop thru high end of margin pages
                for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
                    setPageItem(i);
                }
            }
            return items
        }
    },
    data() {
        return {
            innerValue: 1,
        }
    },
    methods: {
        handlePageSelected(selected) {
            if (this.selected === selected) return

            this.innerValue = selected
            this.$emit('input', selected)
            this.pageChanged(selected)
        },
        prevPage() {
            if (this.selected <= 1) return

            this.handlePageSelected(this.selected - 1)
        },
        nextPage() {
            if (this.selected >= this.pageCount) return

            this.handlePageSelected(this.selected + 1)
        },
        firstPageSelected() {
            return this.selected === 1
        },
        lastPageSelected() {
            return (this.selected === this.pageCount) || (this.pageCount === 0)
        },
        selectFirstPage() {
            if (this.selected <= 1) return

            this.handlePageSelected(1)
        },
        selectLastPage() {
            if (this.selected >= this.pageCount) return

            this.handlePageSelected(this.pageCount)
        }
    }
}
</script>

<style lang="css" scoped>
a {
    cursor: pointer;
}
</style>
