<template>
    <div class="container" style="max-width: 1200px; padding-top: 70px;">
        <div class="d-flex flex-wrap">
            <div class="imgWrapper">
                <img :src="API_URL + data.bookData.cover" alt="Book Cover" class="h-100 w-100" style="border-radius: 25px;">
            </div>
            <div class="d-flex ms-5 flex-column flex-fill" style="max-width: 800px;">
                <h1>{{ data.bookData.title || "Book Title" }}</h1>
                <div class="w-50 d-flex flex-wrap pt-4">
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
                <div class="my-3" style="min-height: 50px;">
                    <button type="button" class="rounded-pill border-0 d-flex align-items-center borrowBtn bgHover lh-sm fw-bold text-white h-100">
                        Borrow Book
                    </button>
                </div>
                <div class="d-flex flex-column mt-4">
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
                    <span class="w-100 mt-2" v-if="!readMore">
                        {{ data.bookData.description.slice(0, 200) + "..." }}
                    </span>
                    <span class="w-100 mt-2" v-else-if="readMore">
                        {{ data.bookData.description }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { getBookById } from '../api/books.js';
    import { API_URL } from '../const.js';
    import chevronDown from '../assets/icons/chevronDown.vue';
    import chevronUp from '../assets/icons/chevronUp.vue';

    const props = defineProps(["bookId"])
    
    const data = reactive({
        bookData : {}
    })
    const readMore = ref(false)

    function showReadMore(){
        readMore.value = !readMore.value
    }

    async function getBookData(val){
        try {
            const book = await getBookById(val)
            if(book.data.message === "SUCCESS"){
                data.bookData = book.data.data
                console.log(data.bookData.description.length)
            } 
        } catch (error) {
            console.log(error)
        }
    }
    getBookData(props.bookId)
</script>

<style scoped>
    *{
        color: white;
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
        margin-bottom: 12px;
        min-width: 36px;
        min-height: 36px;
        padding: 0 30px;
        border: 1px solid rgb(207, 217, 222);
        background-color: #CFB997;
    }

    .bgHover:hover{
        background-color: rgba(207, 185, 151, 0.8) !important;
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