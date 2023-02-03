<template>
    <div v-if="data.bookData !== null" class="container position-relative" style="max-width: 1200px; padding-top: 70px;">
        <div class="position-absolute" style="top: 20px;">
            <div class="rounded-circle backButton bgHover" @click="back">
                <IconBack/>
            </div>
        </div>
        <div class="d-flex flex-wrap mt-4">
            <div class="d-flex flex-wrap">
                <div class="imgWrapper">
                    <img :src="API_URL + data.bookData.cover" alt="Book Cover" class="h-100 w-100" style="border-radius: 25px;">
                </div>
                <div class="d-flex flex-column flex-fill" style="max-width: 770px; margin-left: 80px;">
                    <h1>{{ data.bookData.title || "Book Title" }}</h1>
                    <div class="w-75 d-flex flex-wrap pt-4">
                        <div class="d-flex flex-column w-50 pb-4">
                            <span class="dataLabel">Author</span>
                            <span>{{ data.bookData.author.name || "Name" }}</span>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <span class="dataLabel">Publish</span>
                            <span>{{ data.bookData.published_at || "Year" }}</span>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <span class="dataLabel">Pages</span>
                            <span>{{ data.bookData.total_page || "0" }}</span>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <span class="dataLabel">Stock</span>
                            <span>{{ data.bookData.stock || "0" }}</span>
                        </div>
                    </div>

                    <div v-if="role === 'USER'" class="my-3 d-flex" style="min-height: 50px;">
                        <button v-if="isAlreadyBorrow" @click="unBorrow()" type="button" class="rounded-pill border-0 d-flex align-items-center borrowBtn lh-sm fw-bold text-white h-100 bg-danger">
                            Cancel Borrow
                        </button>

                        <template v-else>
                            <button v-if="data.bookData.stock === 0" disabled="true" type="button" class="rounded-pill border-0 d-flex align-items-center borrowBtn lh-sm fw-bold text-white h-100 bg-dark">
                                Out Of Stock
                            </button>
            
                            <button v-else @click="order()" type="button" class="rounded-pill border-0 d-flex align-items-center borrowBtn lh-sm fw-bold text-white h-100">
                                Borrow Book
                            </button>
                        </template>
                    </div>

                    <div v-else-if="role === 'ADMIN'" class="my-3 d-flex" style="min-height: 50px;">
                        <button type="button" 
                        class="rounded-pill border-0 d-flex align-items-center lh-sm fw-bold text-white h-100 btn btn-warning px-4"
                        data-bs-toggle="modal" 
                        data-bs-target="#updateModal"
                        >
                            Edit Book
                        </button>
                        <button type="button" 
                        class="ms-4 rounded-pill border-0 d-flex align-items-center lh-sm fw-bold text-white h-100 btn btn-danger px-4"
                        data-bs-toggle="modal" 
                        data-bs-target="#deleteModal"
                        >
                            Delete Book
                        </button>
                    </div>
                    <div class="d-flex flex-column mt-4" v-if="data.bookData.description !== 'null'">
                        <div class="d-flex justify-content-between">
                            <span class="dataLabel">
                                Description
                            </span>
                            <button v-if="(data.bookData.description.length > 200) && !readMore" class="rounded-circle bgReadMore bgHover border-0 bg-transparent" type = "button" @click="showReadMore">
                                <chevronDown/>
                            </button>
                            <button v-else-if="(data.bookData.description.length > 200) && readMore" class="rounded-circle bgReadMore bgHover border-0 bg-transparent" type = "button" @click="showReadMore">
                                <chevronUp/>
                            </button>
                        </div>
                        <span class="w-100 mt-2" v-if="!readMore && data.bookData.description.length > 200">
                            {{ data.bookData.description.slice(0, 200) + "..." }}
                        </span>
                        <span class="w-100 mt-2" v-else-if="data.bookData.description.length < 200">
                            {{ data.bookData.description || ""}}
                        </span>
                        <span class="w-100 mt-2" v-else-if="readMore">
                            {{ data.bookData.description }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bg-transparent" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered bg-transparent">
                <div class="modal-content d-flex flex-column">
                    <h3 class="ms-3 mt-3 bg-transparent text-dark">
                        Update Book
                    </h3>
                    <span class="bg-transparent text-dark ms-3 mt-2 fs-5">
                        Book Stock
                    </span>
                    <div class="d-flex justify-content-center bg-transparent my-3">
                        <button type="button"
                        class="d-flex justify-content-center align-items-center text-dark rounded-circle p-2 border-0"
                        @click="subtractStock"
                        style="background-color: #E1E8EE;"
                        >
                            <dashLg/>
                        </button>
                        <input type="text"
                        min= "0"
                        v-if="data.bookData !== null"
                        class="rounded-pill form-control mx-3 text-dark"
                        v-model="editStock"
                        style="width: 100px; text-align: center; background-color: aliceblue;"
                        onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                        >
                        <button type="button"
                        class="d-flex justify-content-center align-items-center text-dark rounded-circle p-2 border-0"
                        @click="editStock++"
                        style="background-color: #E1E8EE;"
                        >
                            <plusLg/>
                        </button>
                    </div>
                    <div class="d-flex flex-row-reverse bg-transparent mb-4">
                        <button type="button" 
                        class="btn btn-info rounded-pill me-3" 
                        @click="updateBookData" 
                        >
                            Update Book
                        </button>
                        <button type="button" 
                        class="btn btn-danger rounded-pill me-3 px-3" 
                        data-bs-dismiss="modal"
                        @click="editStock = data.bookData.stock ">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bg-transparent" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered bg-transparent">
                <div class="modal-content bg-transparent d-flex flex-column" style="max-height: 450px; border-radius: 25px;">
                    <div class="d-flex flex-fill justify-content-center align-items-center position-relative" 
                    style="border-radius: 25px 25px 0 0 ; min-height: 225px; background-color: #B73E3E;">
                        <button type="button" class="position-absolute bg-transparent border-0" data-bs-dismiss="modal" 
                        style="top: 5%; right: 2.5%;">
                            <IconClose style="fill: white;"/>
                        </button>
                        <IconWarning/>
                    </div>
                    <div class="d-flex flex-fill flex-column align-items-center bg-white text-dark"
                    style="border-radius: 0 0 25px 25px;">
                        <h1 class="mt-4 bg-transparent text-dark">
                            Are You Sure ?
                        </h1>
                        <span class="bg-transparent text-dark fs-5">
                            This action cannnot be undone !
                        </span>
                        <button type="button" 
                        class="rounded-pill border-0 d-flex align-items-center lh-sm fw-bold text-white h-100 btn btn-danger my-4" 
                        style="padding: 10px 15px;"
                        @click="deleteBookData"
                        >
                            Delete Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import { reactive, ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { getBookById, updateBook, deleteBook } from '../api/books.js';
    import { API_URL } from '../const.js';
    import IconBack from '../assets/icons/IconBack.vue';
    import chevronDown from '../assets/icons/chevronDown.vue';
    import chevronUp from '../assets/icons/chevronUp.vue';
    import dashLg from '../assets/icons/dashLg.vue';
    import plusLg from '../assets/icons/plusLg.vue';
    import IconClose from '../assets/icons/IconClose.vue';
    import IconWarning from '../assets/icons/IconWarning.vue';
    import { getOrderByUserIdAndBookId } from '../api/order';
    import {orderSocket} from '../main';
    import session from '../stores/session';

    const sessionStores = session();
    const props = defineProps(["bookId"])
    const isAlreadyBorrow = ref(false);

    const data = reactive({
        bookData : null
    })
    const readMore = ref(false)
    const editStock = ref(null)
    const updateModal = ref(null)
    const deleteModal = ref(null)
    const router = useRouter()

    const role = localStorage.getItem("role")

    function back(){
        router.go(-1)
    }

    function showReadMore(){
        readMore.value = !readMore.value;
    }

    function subtractStock(){
        if(editStock.value > 0){
            editStock.value--
        }
    }

    async function getBookData(val){
        try {
            const book = await getBookById(val);
            if(book.data.message === "SUCCESS") {
                data.bookData = book.data.data;
                editStock.value = data.bookData.stock
            } 
        } catch (error) {
            return;
        }
    }

    async function updateBookData(){
        try {
            const update = await updateBook(props.bookId, editStock.value)
            if(update.data.message === "SUCCESS"){
                data.bookData.stock = update.data.data.stock
                updateModal.value.hide()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteBookData(){
        try {
            const del = await deleteBook(props.bookId)
            if(del.data.message === "SUCCESS"){
                deleteModal.value.hide()
                router.replace("/")
            }
        } catch (error) {
            
        }
    }
async function order() {
    try {
        orderSocket.socket.emit('create-order', {
            userId: sessionStores.userId,
            bookId: parseInt(props.bookId)
        });
        isAlreadyBorrow.value = true;
        data.bookData.stock--;
    } catch (error) {
        return;
    }
}

async function unBorrow() {
    try {
        orderSocket.socket.emit('delete-order', {
            userId: sessionStores.userId,
            bookId: parseInt(props.bookId)
        });
        isAlreadyBorrow.value = false;
        data.bookData.stock++;
    } catch (error) {
        return;
    }
}

onMounted(async () => {
    try {
        await getBookData(props.bookId);
        updateModal.value = new bootstrap.Modal("#updateModal", {});
        deleteModal.value = new bootstrap.Modal("#deleteModal", {});
        const getOrder = await getOrderByUserIdAndBookId({bookId: props.bookId});
        if(getOrder.data.message === 'SUCCESS') {
            if(getOrder.data.data !== null) {
                isAlreadyBorrow.value = true;
            }
        }
    } catch (error) {
        return;
    }
});
</script>

<style scoped>
    * {
        color: white;
    }

    .backButton{
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .imgWrapper{
        height: 500px;
        width: 320px;
        min-height: 500px;
        min-width: 320px;
    }

    .dataLabel{
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
    }

    .borrowBtn{
        min-width: 36px;
        min-height: 36px;
        padding: 0 30px;
        border: 1px solid rgb(207, 217, 222);
        background-color: #CFB997;
    }

    .bgHover:hover{
        background-color: rgba(207, 185, 151, 0.8) !important;
    }
    .bg-disabled{
        background-color: rgba(207, 185, 151, 0.406) !important;
    }

    .bgReadMore{
        min-width: 20px;
        min-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
    }
</style>