@extends('laraval::demo.layout')

@section('title')
    Local Demo ::
    @parent
@stop

@section('form-element')
    <form
        id="demo-form-laraval"
        action="{{ route('laraval::demo.local.store') }}"
        method="POST"
        class="form-horizontal">
        @stop
    </form>

@section('init-script')
    {!! Laraval::init() !!}
    @parent
    {!! Laraval::create('local', 'form#demo-form-laraval', $rules, [/* options */]) !!}
@stop

@section('form-content')

    <div class="row">
        <div class="col-md-8">
            {!! Form::demoTitle('general') !!}
            {!! Form::demoInput('title') !!}
            {!! Form::demoInput('body') !!}
            {!! Form::demoInput('json', '', 'text', 'JSON') !!}
            {!! Form::demoInput('ip', '') !!}


            {!! Form::demoTitle('dates') !!}
            {!! Form::demoInput('born', '', 'date') !!}
            {!! Form::demoInput('died', '', 'date') !!}
            {!! Form::demoInput('between_dates', '', 'date') !!}


            {!! Form::demoTitle('numbers &amp; integers') !!}
            {!! Form::demoInput('age', '', 'number') !!}
            {!! Form::demoInput('integer', 'integer', 'number') !!}
            {!! Form::demoInput('digits', 'digits:5', 'number') !!}
            {!! Form::demoInput('digits_between', 'digits_between:3,5', 'number') !!}



            {!! Form::demoTitle('required variations') !!}
            {!! Form::demoInput('required_if', 'required_if:title,hello', 'text', 'if') !!}
            {!! Form::demoInput('required_with', 'required_with:title,body', 'text', 'with') !!}
            {!! Form::demoInput('required_with_all', 'required_with_all:title,body', 'text', 'with all') !!}
            {!! Form::demoInput('required_with_all2', 'required_with_all:title,body,unexisting', 'text', 'with all') !!}
            {!! Form::demoInput('required_without', 'required_without:title,body', 'text', 'with') !!}
            {!! Form::demoInput('required_without_all', 'required_without_all:title,body', 'text', 'with') !!}

            {!! Form::demoTitle('special') !!}
        </div>


        <div class="col-md-4">
            {!! Form::demoTitle('Comparing') !!}
            {!! Form::demoInput('compare_same', 'same:title', 'text', 'Same') !!}
            {!! Form::demoInput('compare_different', 'different:title', 'text', 'Different') !!}
            {!! Form::demoInput('compare_in', 'in:foo,boo,da', 'text', 'in') !!}
            {!! Form::demoInput('compare_not_int', 'not_in:foo,boo,da', 'text', 'Not in') !!}

            {!! Form::demoTitle('size') !!}
            {!! Form::demoInput('size_string', 'size:5', 'text', 'String') !!}
            {!! Form::demoInput('size_number', 'size:5', 'number', 'Number') !!}
            {!! Form::demoInput('size_file', 'size:5', 'file', 'File') !!}

            {!! Form::demoTitle('min') !!}
            {!! Form::demoInput('min_string', 'min:5', 'text', 'String') !!}
            {!! Form::demoInput('min_number', 'min:5', 'number', 'Number') !!}
            {!! Form::demoInput('min_file', 'min:5', 'file', 'File') !!}

            {!! Form::demoTitle('max') !!}
            {!! Form::demoInput('max_string', 'max:5', 'text', 'String') !!}
            {!! Form::demoInput('max_number', 'max:5', 'number', 'Number') !!}
            {!! Form::demoInput('max_file', 'max:5', 'file', 'File') !!}

            {!! Form::demoTitle('') !!}

        </div>

    </div>


    <div class="row">


        <div class="col-md-8">
            <div class="form-group has-feedback">
                <label class="control-label col-md-3" for="email">Email</label>

                <div class="col-md-9">
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input id="email" name="email" placeholder="Email" data-laraval="{{ $rules['email'] }}" type="text" class="form-control" aria-describedby="emailStatus">
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
                        <input id="url" name="url" placeholder="URL" data-laraval="{{ $rules['url'] }}" type="text" class="form-control" aria-describedby="urlStatus">
                    </div>
                    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="urlStatus" class="sr-only">(success)</span>
                </div>
            </div>


            <div class="form-group">
                <label class="control-label col-md-3">Options</label>

                <div class="col-md-9">
                    <div class="checkbox">
                        <label>
                            <input name="is_admin" id="is_admin" type="checkbox" value="1" data-laraval="{{ $rules['is_admin'] }}">
                            Admin user
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input name="active" id="active" type="checkbox" value="1" data-laraval="{{ $rules['active'] }}">
                            Activated
                        </label>
                    </div>
                </div>
            </div>
        </div>


        <div class="col-md-4">

        </div>
    </div>


@stop
