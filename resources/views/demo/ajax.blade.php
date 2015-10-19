@extends('laraval::demo.layout')

@section('title')
    Ajax Demo ::
    @parent
@stop

@section('form-element')
    <form
        id="demo-form-laraval"
        action="{{ route('laraval::demo.ajax.store') }}"
        method="POST"
        class="form-horizontal">
        @stop
    </form>

@section('form-content')

    <div class="row">
        <div class="col-md-8">
            {!! _demoFormTitle('general') !!}
            {!! _demoInput('title') !!}
            {!! _demoInput('body') !!}

            {!! _demoFormTitle('dates') !!}
            {!! _demoInput('born', $laraval->rule('born'), 'date') !!}
            {!! _demoInput('died', $laraval->rule('died'), 'date') !!}
            {!! _demoInput('between_dates', $laraval->rule('between_dates'), 'date') !!}

            {{--
            {!! _demoInput('json', $laraval->rule('json'), 'text', 'JSON') !!}
            {!! _demoInput('ip', $laraval->rule('ip')) !!}

            {!! _demoFormTitle('numbers &amp; integers') !!}
            {!! _demoInput('integer', 'integer', 'number') !!}
            {!! _demoInput('digits', 'digits:5', 'number') !!}
            {!! _demoInput('digits_between', 'digits_between:3,5', 'number') !!}
            {!! _demoInput('age', $laraval->rule('age'), 'number') !!}


            {!! _demoFormTitle('dates') !!}
            {!! _demoInput('born', $laraval->rule('born'), 'date') !!}
            {!! _demoInput('died', $laraval->rule('died'), 'date') !!}
            {!! _demoInput('between_dates', $laraval->rule('between_dates'), 'date') !!}
            --}}

        </div>
        <div class="col-md-3">
            <div class="form-group"></div><!--
            <div class="form-group has-feedback">
                <label class="control-label col-md-3" for="email">Email</label>

                <div class="col-md-9">
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input id="email" name="email" placeholder="Email" data-laraval="{{ $laraval->rule('email') }}" type="text" class="form-control" aria-describedby="emailStatus">
                    </div>
                    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="emailStatus" class="sr-only">(success)</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-md-3" for="url">URL</label>

                <div class="col-md-9">
                    <div class="input-group">
                        <span class="input-group-addon">#</span>
                        <input id="url" name="url" placeholder="URL" data-laraval="{{ $laraval->rule('url') }}" type="text" class="form-control" aria-describedby="urlStatus">
                    </div>
                    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="urlStatus" class="sr-only">(success)</span>
                </div>
            </div>

        </div>-->
        </div>
    </div>


@stop

@section('init-script')
    {!! $laraval->init() !!}
    @parent
    {!!
    $laraval->make('form', [
        'url' => URL::route('laraval::demo.ajax.validate')
    ])
    !!}
@stop

@push('scripts')
<script>
    $(function () {
        demo.CP.add('Rules')
            .addCode(
                'json',
                demo.util.JSON.stringify({!! json_encode($rules) !!}, null, 4),
                'json'
            );
    })
</script>
@stop

