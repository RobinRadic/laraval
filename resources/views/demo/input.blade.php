
<div class="form-group">
    <label class="control-label col-md-3" for="{{ $id }}">{{ $label }}</label>

    <div class="col-md-9">
        <input class="form-control input-sm" type="{{ $type }}" id="{{ $id }}" name="{{ $id }}" placeholder="{{ $label }}"
               @if(strlen($rules) > 0)
               data-laraval="{{ $rules }}"
               @endif
        >
        @if($type === 'date' || $type === 'file')
        <span class="help-block help-block-sm">{{$rules}}</span>
        @endif
    </div>
</div>
