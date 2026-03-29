<template>
    <Page title="Components" :breadcrumbs="[{name: 'Components', active: true}]">

        <!-- Buttons -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Buttons</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body space-y-4">
                    <div>
                        <p class="text-sm text-base-content/50 mb-3">Themes</p>
                        <div class="flex flex-wrap gap-2">
                            <Button label="Primary" />
                            <Button label="Success" theme="success" />
                            <Button label="Info" theme="info" />
                            <Button label="Warning" theme="warning" />
                            <Button label="Error" theme="error" />
                            <Button label="Outline" theme="outline" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-base-content/50 mb-3">With Icons</p>
                        <div class="flex flex-wrap gap-2">
                            <Button label="Add New" icon="plus" />
                            <Button label="Edit" icon="edit" theme="outline" />
                            <Button label="Delete" icon="trash" theme="error" />
                            <Button label="Save" icon="save" theme="success" />
                            <Button label="Upload" icon="cloud-upload" theme="info" />
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-base-content/50 mb-3">Disabled</p>
                        <div class="flex flex-wrap gap-2">
                            <Button label="Disabled" :disabled="true" />
                            <Button label="Disabled Outline" theme="outline" :disabled="true" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Text Inputs -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Text Inputs</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput name="demo_text" label="Text Input" placeholder="Enter text..." v-model="demoForm.text" />
                        <TextInput name="demo_email" label="Email Input" type="email" placeholder="user@example.com" v-model="demoForm.email" />
                        <TextInput name="demo_password" label="Password" type="password" placeholder="••••••••" v-model="demoForm.password" />
                        <TextInput name="demo_required" label="Required Field" :required="true" placeholder="This is required" v-model="demoForm.required" />
                        <TextInput name="demo_disabled" label="Disabled" :disabled="true" v-model="demoForm.disabled" />
                    </div>
                    <div class="mt-4">
                        <TextInput name="demo_textarea" label="Textarea" type="textarea" placeholder="Write something..." v-model="demoForm.textarea" />
                    </div>
                </div>
            </div>
        </section>

        <!-- File Input -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">File Input</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FileInput name="demo_file" label="Single File" v-model="demoForm.file" accept="image/*" />
                        <FileInput name="demo_files" label="Multiple Files" :multiple="true" v-model="demoForm.files" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Badges -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Badges</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge theme="success">Success</Badge>
                        <Badge theme="info">Info</Badge>
                        <Badge theme="warning">Warning</Badge>
                        <Badge theme="error">Error</Badge>
                    </div>
                </div>
            </div>
        </section>

        <!-- Icons -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Icons</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <p class="text-sm text-base-content/50 mb-4">
                        Powered by <a href="https://heroicons.com" target="_blank" class="link link-primary">Heroicons</a>.
                        Use <code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">&lt;Icon name="..." /&gt;</code> with any name below.
                        To add more, see <code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">Icon.vue</code>.
                    </p>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                        <div v-for="name in iconNames" :key="name" class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-base-200 transition-colors cursor-default">
                            <Icon :name="name" class="h-5 w-5 text-base-content/70" />
                            <span class="text-[10px] text-base-content/40 text-center leading-tight">{{ name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Toasts -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Toast Notifications</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <p class="text-sm text-base-content/50 mb-3">Click to trigger toast notifications</p>
                    <div class="flex flex-wrap gap-2">
                        <Button label="Success Toast" theme="success" @click="toastStore.success('Operation completed successfully!')" />
                        <Button label="Error Toast" theme="error" @click="toastStore.error('Something went wrong. Please try again.')" />
                        <Button label="Info Toast" theme="info" @click="toastStore.info('Here is some useful information.')" />
                        <Button label="Warning Toast" theme="warning" @click="toastStore.warning('Please be careful with this action.')" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Alerts -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Inline Alerts</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body space-y-3">
                    <p class="text-sm text-base-content/50 mb-1">Click to toggle inline alert</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                        <Button label="Show Success" theme="success" @click="showDemoAlert('success')" />
                        <Button label="Show Error" theme="error" @click="showDemoAlert('error')" />
                    </div>
                    <Alert />
                </div>
            </div>
        </section>

        <!-- Spinner -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Spinners</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="flex flex-wrap items-center gap-8">
                        <Spinner />
                        <Spinner text="Processing..." />
                        <Spinner text="" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Panels -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Panels</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Panel title="Panel with Title">
                    <p class="text-sm text-base-content/60">This is a panel with a title header and body padding.</p>
                </Panel>
                <Panel>
                    <p class="text-sm text-base-content/60">This is a panel without a title, just content inside.</p>
                </Panel>
            </div>
        </section>

        <!-- Modal -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Modal</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="flex flex-wrap gap-2">
                        <Button label="Open Modal" @click="demoModal.show = true" />
                        <Button label="Loading Modal" theme="outline" @click="demoModal.loading = true; demoModal.show = true" />
                    </div>
                </div>
            </div>
        </section>

        <Modal title="Modal Content" :is-showing="demoModal.show" :is-loading="demoModal.loading" @close="demoModal.show = false; demoModal.loading = false">
            <p class="text-sm text-base-content/60 mb-6">This is a modal dialog with custom content. You can put any components here.</p>
            <div class="flex gap-2 justify-end">
                <Button label="Cancel" theme="outline" @click="demoModal.show = false" />
                <Button label="Confirm" @click="demoModal.show = false; toastStore.success('Confirmed!')" />
            </div>
        </Modal>

        <!-- Table -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Table</h3>
            <Table
                :headers="{name: 'Name', email: 'Email', role: 'Role', status: 'Status'}"
                :records="demoTable.records"
                :actions="demoTable.actions"
                :sorting="{name: true}"
                :pagination="demoTable.pagination"
                :is-loading="demoTable.loading"
                @action="onDemoTableAction"
            >
                <template v-slot:content-status="props">
                    <Badge :theme="props.item.status === 'Active' ? 'success' : 'warning'">{{ props.item.status }}</Badge>
                </template>
            </Table>
        </section>

        <!-- Avatar -->
        <section class="mb-8">
            <h3 class="text-lg font-semibold mb-4">Avatar</h3>
            <div class="card bg-base-100 shadow-sm border border-base-300/50">
                <div class="card-body">
                    <div class="flex items-center gap-4">
                        <Avatar class="w-8 h-8" />
                        <Avatar class="w-12 h-12" />
                        <Avatar class="w-16 h-16" />
                        <Avatar class="w-20 h-20" />
                    </div>
                </div>
            </div>
        </section>

    </Page>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {trans} from "@/helpers/i18n";
import {useToastStore} from "@/stores/toast";
import {useAlertStore} from "@/stores/alert";
import Page from "@/views/layouts/Page";
import Button from "@/views/components/input/Button";
import TextInput from "@/views/components/input/TextInput";
import FileInput from "@/views/components/input/FileInput";
import Badge from "@/views/components/Badge";
import Icon from "@/views/components/icons/Icon";
import Spinner from "@/views/components/icons/Spinner";
import Avatar from "@/views/components/icons/Avatar";
import Panel from "@/views/components/Panel";
import Modal from "@/views/components/Modal";
import Alert from "@/views/components/Alert";
import Table from "@/views/components/Table";

export default defineComponent({
    components: {
        Page, Button, TextInput, FileInput, Badge, Icon, Spinner,
        Avatar, Panel, Modal, Alert, Table,
    },
    setup() {
        const toastStore = useToastStore();
        const alertStore = useAlertStore();

        const iconNames = [
            'bars', 'times', 'angle-up', 'angle-down', 'angle-right', 'angle-left',
            'home', 'plus', 'edit', 'trash', 'save', 'check', 'search', 'refresh',
            'upload', 'download', 'clipboard', 'cloud-upload', 'filter',
            'sun', 'moon', 'eye', 'eye-off', 'settings', 'bell', 'star', 'heart',
            'bookmark', 'tag', 'envelope', 'paperclip', 'document', 'folder',
            'photo', 'link', 'chat', 'warning', 'info', 'shield',
            'users', 'sign-out', 'key', 'lock',
            'calendar', 'clock', 'map-pin', 'phone', 'globe', 'tachometer',
        ];

        const demoForm = reactive({
            text: '',
            email: '',
            password: '',
            required: '',
            disabled: 'Cannot edit this',
            textarea: '',
            file: null,
            files: null,
        });

        const demoModal = reactive({
            show: false,
            loading: false,
        });

        const demoTable = reactive({
            loading: false,
            records: [
                {name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active'},
                {name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active'},
                {name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive'},
                {name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active'},
            ],
            actions: {
                edit: {id: 'edit', name: 'Edit', icon: 'edit', showName: false},
                delete: {id: 'delete', name: 'Delete', icon: 'trash', showName: false, danger: true},
            },
            pagination: {
                meta: {current_page: 1, last_page: 1},
                links: null,
            },
        });

        function onDemoTableAction(params) {
            toastStore.info('Action: ' + params.action.id + ' on ' + params.item.name);
        }

        function showDemoAlert(type) {
            if (type === 'success') {
                alertStore.success('This is a success alert message!');
            } else {
                alertStore.error('This is an error alert message!');
            }
        }

        return {
            trans, toastStore, iconNames,
            demoForm, demoModal, demoTable,
            onDemoTableAction, showDemoAlert,
        }
    }
});
</script>
