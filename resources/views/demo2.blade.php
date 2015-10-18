@extends('laravel-jquery-validation::layout')

@section('title')
    @parent
    :: Local Demo
@stop

@section('form-element')
    <form
        id="demo-form-laraval"
        action="{{ route('laravel-jquery-validation::demo.store') }}"
        method="POST"
        class="form-horizontal">
        @stop
    </form>

@section('form-content')

    <div class="row">
        <div class="col-md-6">
            {!! _demoInput('title', $rules['title']) !!}
            {!! _demoInput('body', $rules['body']) !!}
            {!! _demoInput('json', $rules['json'], 'text', 'JSON') !!}

            {!! _demoInput('ip', $rules['ip']) !!}
            {!! _demoInput('age', $rules['age'], 'number') !!}
            {!! _demoInput('born', $rules['born'], 'date') !!}
            {!! _demoInput('died', $rules['died'], 'date') !!}

            {!! _demoInput('between_dates', $rules['between_dates'], 'date') !!}
        </div>
        <div class="col-md-6">

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
    </div>


@stop


@section('boot-script')
    <script>
        $(function () {
            $('[data-laraval]').each(function () {
                var pl = $(this).attr('placeholder'),
                    lv = $(this).data('laraval');
                $(this).attr('placeholder', pl + ' (' + lv + ')');
            });


            $('#demo-form-laraval').validate({
                laraval: {
                    enabled: true,
                    mode   : 'local' // local|ajax
                },

                submitHandler: function (form, event) {
                    console.log('submithandler by passing setings', form, event);
                    //event.preventDefault();
                    return false;
                },


                highlight  : function (element) {
                    $(element).closest('.form-group').addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },

                errorElement  : 'span',
                errorClass    : 'help-block help-block-error pull-left',
                errorPlacement: function (error, element) {
                    if ( element.parent('.input-group').length ) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            });

        })
    </script>
@stop
