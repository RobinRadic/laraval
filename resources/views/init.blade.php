<script>
    $(function(){
        function logInit(data){
            console.log(data);
        }
        logInit({!! $config !!});
        logInit({!! $messages !!});
        $.extend(true, $.validator.defaults.laraval, { config: {!! $config !!} });
        $.validator.laraval.addMessages({!! $messages !!});
    })
</script>
