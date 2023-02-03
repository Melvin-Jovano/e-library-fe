<template>
    <div class="container" style="max-width: 1200px; padding-top: 50px;">
        <div class="position-absolute" style="top: 20px;">
            <div class="rounded-circle backButton bgHover" @click="back">
                <IconBack/>
            </div>
        </div>
        <h1 class="my-4">
            Insert Book
        </h1>
        <form @submit.prevent="addBook" class="needs-validation" novalidate>
            <div class="d-flex flex-wrap">
                <div class="imgWrapper">
                    <label class="picBtnWrapper border borderColor" for="coverUpload" title="Insert Cover" :style="{backgroundImage: `url('${data.coverPreviewURL}')`}">
                        <IconUpload class="position-absolute top-50 start-50 translate-middle"/>
                    </label>
                    <input type="file" 
                    accept="image/jpeg, image/png, image/jpg" 
                    class="uploadField" 
                    title="Insert Cover" 
                    id="coverUpload" 
                    @change="coverPreview" 
                    :class="{'is-invalid' : error.errCover && !data.coverFile}"
                    ref="fileUpload"
                    required>
                    <div class="invalid-feedback" style="margin-top: 160%;">
                        Please Insert Book Cover
                    </div>
                </div>
                <div class="d-flex ms-5 flex-column flex-fill" style="max-width: 800px;">
                    <div class="form-floating">
                        <input type="text" 
                        class="form-control bg-transparent text-white borderColor" 
                        id="bookTitle" 
                        :class="{'is-invalid' : error.errTitle && !data.bookTitle}" 
                        placeholder="Insert Title" 
                        style="font-size: 25px; border-radius: 20px;" 
                        v-model="data.bookTitle" 
                        required>
                        <label for="bootTitle" class="bg-transparent form-label" style="font-size: 17px;">
                            Insert Book Title 
                        </label>
                        <div class="invalid-feedback">
                            Please Insert Title
                        </div>
                    </div>
                    <div class="w-75 d-flex flex-wrap pt-4">
                        <div class="d-flex w-50 pb-4 position-relative">
                            <div class="d-flex flex-column w-100">
                                <label for="authorName" class="dataLabel">
                                    Author
                                </label>
                                <select
                                class="form-control bg-transparent rounded-pill mt-2 text-white borderColor"
                                id="authorName"
                                list="authorsList"
                                :class="{'is-invalid' : error.errAuthor && !data.authorName}"
                                style="max-width: 70%;"
                                @change="data.authorId = $event.target.value"
                                required>
                                    <option :selected="!data.authorId" disabled>Select Author</option>
                                    <option v-if="authorName !== null" :selected="authorName !== null">{{ authorName }}</option>
                                    <option v-for="author in authorList" :value="author.id">
                                        {{ author.name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback">
                                    Please Insert Author Name
                                </div>
                            </div>
                            <button type="button"
                            class="position-absolute d-flex justify-content-center align-items-center rounded-circle bg-white" 
                            style="top: 32%; right: 15%; padding: 6px;"
                            title="Add Author"
                            data-bs-toggle="modal"
                            data-bs-target="#addNewAuthor"
                            >
                                <addPerson/>
                            </button>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <label for="publishYear" class="dataLabel">
                                Publish
                            </label>
                            <select name="" 
                            id="publishYear" 
                            class="form-select rounded-pill bg-transparent mt-2 borderColor" 
                            :class="{'is-invalid' : error.errPublish && !data.publishYear}" 
                            style="max-width: 70%;"
                            @change="data.publishYear = $event.target.value"
                            required>
                                <option :selected="!data.publishYear" disabled>Select Year</option>
                                <option v-for="year in yearsList" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                            <div class="invalid-feedback">
                                Please Select a Year
                            </div>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <label for="totalPages" class="dataLabel" style="max-width: 35%;">
                                Pages
                            </label>
                            <input type="number" 
                            class="form-control bg-transparent rounded-pill mt-2 text-white borderColor" 
                            id="totalPages" 
                            min="0"
                            :class="{'is-invalid' : error.errPages && !data.bookPages}" 
                            placeholder="Pages" 
                            style="max-width: 35%;" 
                            v-model="data.bookPages" 
                            required>
                            <div class="invalid-feedback">
                                Please Insert Book's Total Pages
                            </div>
                        </div>
                        <div class="d-flex flex-column w-50 pb-4">
                            <label for="totalStock" class="dataLabel" style="max-width: 35%;">
                                Stocks
                            </label>
                            <input type="number" 
                            class="form-control bg-transparent rounded-pill mt-2 text-white borderColor" 
                            id="totalStock" 
                            min="0"
                            :class="{'is-invalid' : error.errStock && !data.bookStocks}" 
                            placeholder="Stocks" 
                            style="max-width: 35%;" 
                            v-model="data.bookStocks" 
                            required>
                            <div class="invalid-feedback">
                                Please Insert Book's Stock
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column mt-4">
                        <div class="d-flex justify-content-between">
                            <label for="bookDescription" class="dataLabel">
                                Description
                            </label>
                        </div>
                        <span class="w-100 mt-3">
                            <textarea 
                            class="form-control bg-transparent text-white borderColor" 
                            id="bookDescription" 
                            v-model="data.description" 
                            placeholder="Insert Description" 
                            rows="7" 
                            style="border-radius: 25px;"></textarea>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mt-4 d-flex flex-row-reverse" style="min-height: 50px;">
                <button type="submit" class="rounded-pill border-0 d-flex align-items-center insertBook bgHover lh-sm fw-bold text-white h-100">
                    Add Book
                </button>
            </div>
        </form>
    </div>
    <div class="modal fade bg-transparent" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered bg-transparent">
            <div class="modal-content bg-transparent d-flex flex-column" style="max-height: 450px; border-radius: 25px;">
                <div class="d-flex flex-fill justify-content-center align-items-center position-relative" 
                style="border-radius: 25px 25px 0 0 ; min-height: 225px; background-color: #008000;">
                    <button type="button" class="position-absolute bg-transparent border-0" data-bs-dismiss="modal" 
                    style="top: 5%; right: 2.5%;">
                        <IconClose style="fill: white;"/>
                    </button>
                    <checkCircle/>
                </div>
                <div class="d-flex flex-fill flex-column align-items-center bg-white text-dark"
                style="border-radius: 0 0 25px 25px;">
                    <h1 class="mt-4 bg-transparent text-dark">
                        Success!
                    </h1>
                    <span class="mb-5 bg-transparent text-dark fs-5">
                        Book Successfully Added !
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bg-transparent" id="addNewAuthor" tabindex="-1" aria-labelledby="addNewAuthorLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered bg-transparent">
            <div class="modal-content d-flex flex-column">
                <div class="ms-3 mt-3 bg-transparent text-dark fs-4">
                    Add New Author
                </div>
                <div class="form-floating mx-3 my-3 bg-transparent">
                    <input type="text" 
                    class="form-control bg-transparent" 
                    id="newAuthor" 
                    placeholder="Input Name" 
                    v-model="authorName" 
                    :class="{'is-invalid' : error.errInputAuthor && !authorName}"
                    >
                    <label for="newAuthor" class="bg-transparent text-dark">Insert Name</label>
                    <div class="invalid-feedback bg-transparent">
                        Author Already Exist
                    </div>
                </div>
                <div class="d-flex flex-row-reverse bg-transparent mb-4">
                    <button type="button" class="btn btn-info rounded-pill me-3" @click="addAuthor" :disabled="!authorName">
                        Add Author
                    </button>
                    <button type="button" 
                    class="btn btn-danger rounded-pill me-3 px-3" 
                    data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { inputBook } from '../api/books.js';
    import { addNewAuthor, getAllAuthors } from '../api/author.js';
    import IconBack from '../assets/icons/IconBack.vue';
    import IconUpload from '../assets/icons/IconUpload.vue';
    import checkCircle from '../assets/icons/checkCircle.vue';
    import IconClose from '../assets/icons/IconClose.vue';
    import addPerson from '../assets/icons/addPerson.vue';

    const initialData = {
        coverPreviewURL : null,
        coverFile : null,
        bookTitle : null,
        authorId : null,
        publishYear : null,
        bookPages : null,
        bookStocks : null,
        description : null
    }

    const initialError = {
        errTitle : false,
        errCover : false,
        errAuthor : false,
        errPublish : false,
        errPages : false,
        errStock : false,
        errInputAuthor : false
    }

    const data = reactive({...initialData})
    const error = reactive({...initialError})
   
    const authorName = ref(null)
    const yearsList = ref([])
    const authorList = ref([])
    const successModal = ref(null)
    const authorModal = ref(null)
    const fileUpload = ref(null)

    const router = useRouter()

    function back(){
        router.go(-1)
    }

    function getYears(){
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--){
            yearsList.value = [...yearsList.value, i]
        }
    }

    function coverPreview(event){
        data.coverFile = event.target.files[0]
        data.coverPreviewURL = URL.createObjectURL(data.coverFile)
        fileUpload.value.value = ""
    }

    function checkInput(){
        try {
            let invalid = 0
            if (!data.coverFile){
                error.errCover = true
                invalid++
            }
            if (!data.bookTitle){
                error.errTitle = true
                invalid++
            }
            if (!data.authorId){
                error.errAuthor = true
                invalid++
            }
            if (!data.publishYear){
                error.errPublish = true
                invalid++
            }
            if (!data.bookPages){
                error.errPages = true
                invalid++
            }
            if (!data.bookStocks){
                error.errStock = true
                invalid++
            }
            return invalid
        } catch (error) {
            console.log(error)
        }
    }

    async function addAuthor(){
        try {
            const author = await addNewAuthor(authorName.value)
            if(author.data.message === "SUCCESS"){
                data.authorId = author.data.data.id
                authorModal.value.hide()
                getAuthors()
            }
            else if(author.data.message === "DUPLICATE"){
                error.errInputAuthor = true
                authorName.value = null
            }
        } catch (error) {
            
        }
    }

    async function getAuthors(){
        try {
            const authors = await getAllAuthors()
            if(authors.data.message === "SUCCESS"){
                authorList.value = authors.data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function addBook(){
        if(checkInput() === 0){
            try {
                const newBook = await inputBook(data)
                if(newBook.data.message === "SUCCESS"){
                    authorName.value = null
                    Object.assign(data, initialData)
                    Object.assign(error, initialError)
                    successModal.value.show()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    onMounted(async () => {
        getYears()
        await getAuthors()
        successModal.value = new bootstrap.Modal("#successModal", {})
        authorModal.value = new bootstrap.Modal("#addNewAuthor", {})
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
    
    .dataLabel{
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .imgWrapper{
        height: 500px;
        width: 320px;
        min-height: 500px;
        min-width: 320px;
        border-radius: 25px;
        position: relative;
    }


    .picBtnWrapper{
        background-color: rgba(255, 255, 255, 0.3);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        fill: white;
        cursor: pointer;
        border-radius: 25px;
        background-size: cover ;
        background-repeat: no-repeat;
        background-position: center;
    }

    .uploadField{
        display: none;
        position: absolute;
    }

    .insertBook{
        margin-bottom: 12px;
        min-width: 36px;
        min-height: 36px;
        padding: 0 30px;
        border: 1px solid rgb(207, 217, 222);
        background-color: #CFB997;
    }

    .borderColor{
        border-color: #CFB997 !important;
    }

    .bgHover:hover{
        background-color: rgba(207, 185, 151, 0.8) !important;
    }

    .invalid-feedback{
        color: red !important;
    }
</style>