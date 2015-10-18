
<div class="form-group">
    <label class="control-label col-md-3" for="{{ $id }}">{{ $label }}</label>

    <div class="col-md-9">
        <input class="form-control" type="{{ $type }}" id="{{ $id }}" name="{{ $id }}" placeholder="{{ $label }}" data-laraval="{{ $rules }}">
        @if($type === 'date')
        <span class="help-block help-block-sm">{{$rules}}</span>
        @endif
    </div>
</div>
