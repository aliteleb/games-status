<script src="{{asset('/backend/js/cloudflare-static/rocket-loader.min.js')}}" data-cf-settings="fb6345aaf28663db74e96e20-|49" defer=""></script>
{{--<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v52afc6f149f6479b8c77fa569edb01181681764108816"--}}
{{--        integrity="sha512-jGCTpDpBAYDGNYR5ztKt4BQPGef1P0giN6ZGVUi835kFF88FOmmn8jBQWNgrNd8g/Yu421NdgWhwQoaOPFflDw=="--}}
{{--        data-cf-beacon='{"rayId":"7dc828852e03f92f","token":"97ae863207e14d6a8f20a8aa94157871","version":"2023.4.0","si":100}' crossorigin="anonymous"></script>--}}


<script>
    $(document).ready(function() {

        $('.dark-toggle').click(function () {

            $('body').toggleClass('dark');

            var currentStatus = $('body').hasClass('dark');

            // Determine the opposite status based on the current class
            var oppositeStatus = currentStatus;

            // Save it in localStorage
            localStorage['dark_mode'] = currentStatus;

        });


    });
</script>
