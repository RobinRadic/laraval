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
        data-laraval='{!! $laraval->getRules()->toJson() !!}'
        class="form-horizontal">
        @stop
    </form>

@section('form-content')

    <div class="row">
        <div class="col-md-8">
            {!! _demoFormTitle('general') !!}
            {!! _demoInput('title') !!}
            {!! _demoInput('body') !!}
            {!! _demoInput('json', '', 'text', 'JSON') !!}
            {!! _demoInput('ip', $laraval->rule('ip')) !!}


            {!! _demoFormTitle('dates') !!}
            {!! _demoInput('born', '', 'date') !!}
            {!! _demoInput('died', '', 'date') !!}
            {!! _demoInput('between_dates', '', 'date') !!}


            {!! _demoFormTitle('numbers &amp; integers') !!}
            {!! _demoInput('age', $laraval->rule('age'), 'number') !!}
            {!! _demoInput('integer', 'integer', 'number') !!}
            {!! _demoInput('digits', 'digits:5', 'number') !!}
            {!! _demoInput('digits_between', 'digits_between:3,5', 'number') !!}



            {!! _demoFormTitle('required variations') !!}
            {!! _demoInput('required_if', 'required_if:title,hello', 'text', 'if') !!}
            {!! _demoInput('required_with', 'required_with:title,body', 'text', 'with') !!}
            {!! _demoInput('required_with_all', 'required_with_all:title,body', 'text', 'with all') !!}
            {!! _demoInput('required_with_all2', 'required_with_all:title,body,unexisting', 'text', 'with all') !!}
            {!! _demoInput('required_without', 'required_without:title,body', 'text', 'with') !!}
            {!! _demoInput('required_without_all', 'required_without_all:title,body', 'text', 'with') !!}

            {!! _demoFormTitle('special') !!}
        </div>


        <div class="col-md-4">
            {!! _demoFormTitle('Comparing') !!}
            {!! _demoInput('compare_same', 'same:title', 'text', 'Same') !!}
            {!! _demoInput('compare_different', 'different:title', 'text', 'Different') !!}
            {!! _demoInput('compare_in', 'in:foo,boo,da', 'text', 'in') !!}
            {!! _demoInput('compare_not_int', 'not_in:foo,boo,da', 'text', 'Not in') !!}

            {!! _demoFormTitle('size') !!}
            {!! _demoInput('size_string', 'size:5', 'text', 'String') !!}
            {!! _demoInput('size_number', 'size:5', 'number', 'Number') !!}
            {!! _demoInput('size_file', 'size:5', 'file', 'File') !!}

            {!! _demoFormTitle('min') !!}
            {!! _demoInput('min_string', 'min:5', 'text', 'String') !!}
            {!! _demoInput('min_number', 'min:5', 'number', 'Number') !!}
            {!! _demoInput('min_file', 'min:5', 'file', 'File') !!}

            {!! _demoFormTitle('max') !!}
            {!! _demoInput('max_string', 'max:5', 'text', 'String') !!}
            {!! _demoInput('max_number', 'max:5', 'number', 'Number') !!}
            {!! _demoInput('max_file', 'max:5', 'file', 'File') !!}

            {!! _demoFormTitle('') !!}

        </div>

    </div>


    <div class="row">


        <div class="col-md-8">
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


            <div class="form-group">
                <label class="control-label col-md-3">Options</label>

                <div class="col-md-9">
                    <div class="checkbox">
                        <label>
                            <input name="is_admin" id="is_admin" type="checkbox" value="1" data-laraval="{{ $laraval->rule('is_admin') }}">
                            Admin user
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input name="active" id="active" type="checkbox" value="1" data-laraval="{{ $laraval->rule('active') }}">
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

@section('init-script')
    {!! $laraval->init() !!}
    @parent
    <script id="init-script">
        $(function () {
            $('form').validate();
        })
    </script>
@stop
