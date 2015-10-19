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
            {!! Form::demoTitle('general') !!}
            {!! Form::demoInput('title') !!}
            {!! Form::demoInput('body') !!}

            {!! Form::demoTitle('dates') !!}
            {!! Form::demoInput('born', $laraval->rule('born'), 'date') !!}
            {!! Form::demoInput('died', $laraval->rule('died'), 'date') !!}
            {!! Form::demoInput('between_dates', $laraval->rule('between_dates'), 'date') !!}

            {{--
            {!! Form::demoInput('json', $laraval->rule('json'), 'text', 'JSON') !!}
            {!! Form::demoInput('ip', $laraval->rule('ip')) !!}

            {!! Form::demoTitle('numbers &amp; integers') !!}
            {!! Form::demoInput('integer', 'integer', 'number') !!}
            {!! Form::demoInput('digits', 'digits:5', 'number') !!}
            {!! Form::demoInput('digits_between', 'digits_between:3,5', 'number') !!}
            {!! Form::demoInput('age', $laraval->rule('age'), 'number') !!}


            {!! Form::demoTitle('dates') !!}
            {!! Form::demoInput('born', $laraval->rule('born'), 'date') !!}
            {!! Form::demoInput('died', $laraval->rule('died'), 'date') !!}
            {!! Form::demoInput('between_dates', $laraval->rule('between_dates'), 'date') !!}
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

