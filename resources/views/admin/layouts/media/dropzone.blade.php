<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.css"
      integrity="sha512-WvVX1YO12zmsvTpUQV8s7ZU98DnkaAokcciMZJfnNWyNzm7//QRV61t4aEr0WdIa4pe854QHLTV302vH92FSMw==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/min/dropzone.min.js"
        integrity="sha512-oQq8uth41D+gIH/NJvSJvVB85MFk1eWpMK6glnkg6I7EdMqC1XVkW7RxLheXwmFdG03qScCM7gKS/Cx3FYt7Tg==" crossorigin="anonymous"
        referrerpolicy="no-referrer"></script>

<script>
    Dropzone.options.mediaDropzone = {
        maxFilesize: 5, // Maximum file size in MB
        acceptedFiles: ".jpg,.jpeg,.png,.gif,.webp,.svg", // Accepted file types
        init: function () {

            this.on("success", function (file, response) {
                this.removeFile(file);
                $("table#{{(new $model)->getTable()}}").DataTable().ajax.reload();
                toastr.success(response.message);
            });

            this.on("error", function (file, errorMessage, xhr) {
                // Handle upload error
                this.removeFile(file); // Remove the file in case of error
                toastr.error(errorMessage);

            });

            this.on("removedfile", function (file) {
                // Handle file removal
            });
        },

        // Messages
        dictDefaultMessage: "@lang('dropzone.dictDefaultMessage')",
        dictFallbackMessage: "@lang('dropzone.dictFallbackMessage')",
        dictFallbackText: "@lang('dropzone.dictFallbackText')",
        dictFileTooBig: "@lang('dropzone.dictFileTooBig')",
        dictInvalidFileType: "@lang('dropzone.dictInvalidFileType')",
        dictResponseError: "@lang('dropzone.dictResponseError')",
        dictCancelUpload: "@lang('dropzone.dictCancelUpload')",
        dictCancelUploadConfirmation: "@lang('dropzone.dictCancelUploadConfirmation')",
        dictRemoveFile: "@lang('dropzone.dictRemoveFile')",
        dictMaxFilesExceeded: "@lang('dropzone.dictMaxFilesExceeded')",
    };
</script>

<form action="{{ route('admin.media.store') }}" class="dropzone" id="media-dropzone" method="POST" enctype="multipart/form-data">
    @csrf
</form>

