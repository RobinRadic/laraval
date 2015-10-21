<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        @section('title')
            Laraval - Laravel jQuery Validation
        @show
    </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/superhero/bootstrap.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/zenburn.min.css">
    <link rel="stylesheet" href="{{ asset('vendor/laraval/demo.css') }}">

    @stack('styles')

</head>
<body>

@section('navbar')
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    @section('brand')
                        Laraval
                    @show
                </a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <li {!! $current === 'local' ? 'class="active"' : '' !!}><a href="{{ route('laraval::demo.local.show') }}">Local</a></li>
                    <li {!! $current === 'ajax' ? 'class="active"' : '' !!}><a href="{{ route('laraval::demo.ajax.show') }}">AJAX</a></li>
                    <li {!! $current === 'builder' ? 'class="active"' : '' !!}><a href="{{ route('laraval::demo.builder.show') }}">Form Builder</a></li>
                    <li><a href="{{ route('laraval::demo.ajax.show') }}">PHP API</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://github.com/robinradic/laraval" target="_blank">Github</a></li>
                </ul>
            </div>
        </div>
    </nav>
@show
<div class="container-fluid" id="content">
    <div class="container" id="errors">
        @section('errors')
            @if (count($errors) > 0)
                <?php
                Kint::dump([
                    'toArray'       => $errors->toArray(),
                    'toJson'        => $errors->toJson(),
                    'all'           => $errors->all(),
                    'jsonSerialize' => $errors->jsonSerialize()
                ]);
                ?>

                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        @show
    </div>

    @section('content')
        <div class="row">
            <div class="col-md-8">
                @section('form-element')
                    <form
                        id="demo-form-local"
                        action="{{ app('url')->current() }}"
                        method="POST"
                        class="form-horizontal"
                    >
                        @show
                        {!! csrf_field() !!}
                        @section('form-content')
                        @show
                        @section('form-actions')
                            <div class="form-actions">
                                @section('form-action-buttons')
                                    <div class="btn-group btn-group-sm">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                    <div class="btn-group btn-group-sm">
                                        <button type="button" class="btn btn-success action-validate">Validate</button>
                                        <button type="button" class="btn btn-success action-validate-focused">Validate</button>
                                    </div>
                                    <div class="btn-group btn-group-sm">
                                        <button type="button" class="btn btn-info action-random">Random fill</button>
                                        <button type="button" class="btn btn-info action-clear-validation">Clear validation</button>
                                        <button type="button" class="btn btn-info action-clear-values">Clear values</button>
                                    </div>
                                @show
                            </div>
                        @show
                    </form>
            </div>
            <div class="col-md-4 fade" id="demo-code-preview">
            </div>
        </div>
    @show
</div>

<!-- laraval & dependencies -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min.js"></script>
<script src="{{ asset('vendor/laraval/jquery.validate.laravel.dev.js') }}"></script>

<!-- demo scripts -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.6/jquery.slimscroll.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>
<script src="{{ asset('vendor/laraval/demo.js') }}"></script>

@section('init-script')
    <script>
        // Bootstrap 3 styling
        $.validator.setDefaults({
            highlight  : function (element) {
                //console.log('highlight', arguments);
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
        demo.extend({
            jsonFilePath: '{{ asset('vendor/laraval/demo-data.json') }}'
        });
    </script>
@show
@section('demo-init-script')
    <script> $(function () {
            demo.init();
        }); </script>
@show

@stack('scripts')


</body>
</html>
