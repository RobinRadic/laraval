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

@section('init-script')
    {!! Laraval::init() !!}
    @parent
    {!!
    Laraval::make('ajax')->create('form#demo-form-laraval', [
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


@section('form-content')

    <div class="row">
        <div class="col-md-8">
            {!! Form::demoTitle('general') !!}
            {!! Form::demoInput('title') !!}
            {!! Form::demoInput('body') !!}

            {!! Form::demoTitle('dates') !!}
            {!! Form::demoInput('born', '', 'date') !!}
            {!! Form::demoInput('died', '', 'date') !!}
            {!! Form::demoInput('between_dates', '', 'date') !!}

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
            <div class="form-group"></div>
        </div>
    </div>


@stop
