@if(isset($embed) && $embed)<script {!! isset($embedAttributes) && is_string($embedAttributes) ? $embedAttributes : '' !!}>@endif
$(function () {
    var sel = '{!! $selector !!}';
    var validator = $(sel).validate({!! $options->toJson(JSON_PRETTY_PRINT) !!});
@if(isset($debug) && $debug === true) console.log('validator created (' + sel + '): ', validator); @endif
});
@if(isset($embed) && $embed)</script>@endif
