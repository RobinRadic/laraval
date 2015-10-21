@if(isset($embed) && $embed)<script {!! isset($embedAttributes) && is_string($embedAttributes) ? $embedAttributes : '' !!}>@endif
$(function () {
    var $form = $('{!! $selector !!}');
    @if(isset($rules) && !$rules->isEmpty())
    $form.data('laraval', {!! $rules->toJson(JSON_PRETTY_PRINT) !!});
    @endif
    var validator = $form.validate({!! $options->toJson(JSON_PRETTY_PRINT) !!});
});
@if(isset($embed) && $embed)</script>@endif
