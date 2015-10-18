<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>
        @section('title')
            Laravel jQuery Validation
        @show
    </title>
    <link rel="stylesheet" href="{{ asset('vendor/laravel-jquery-validation/vendor/bootstrap/dist/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laravel-jquery-validation/vendor/bootstrap/dist/css/bootstrap-theme.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laravel-jquery-validation/vendor/highlightjs/styles/tomorrow.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laravel-jquery-validation/demo.css') }}">
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
                        Laravel jQuery Validation
                    @show
                </a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="{{ route('laravel-jquery-validation::demo.local') }}">Local <span class="sr-only">(current)</span></a></li>
                    <li><a href="{{ route('laravel-jquery-validation::demo.ajax') }}">AJAX</a></li>
                    <li><a href="{{ route('laravel-jquery-validation::demo.demo2') }}">Demo2</a></li>
                    <li><a href="{{ route('laravel-jquery-validation::demo.ajax') }}">PHP API</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://github.com/robinradic/laravel-jquery-validation" target="_blank">Github</a></li>
                </ul>
            </div>
        </div>
    </nav>
@show
<div class="container-fluid" id="content" tabindex="-1">
    <div class="container" id="errors" tabindex="-1">
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

    <div class="row">
        <div class="col-md-8">
            @section('form-element')
                <form
                    id="demo-form-local"
                    action="{{ route('laravel-jquery-validation::demo.store') }}"
                    method="POST"
                    class="form-horizontal"
                >
                    @show
                    {!! csrf_field() !!}
                    @section('form-content')
                    @show
                    @section('form-actions')
                        <div class="form-actions">
                            <div class="col-md-offset-3 col-md-9">
                                @section('form-action-buttons')
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-info action-random">Random fill</button>
                                        <button type="button" class="btn btn-info action-clear-validation">Clear validation</button>
                                        <button type="button" class="btn btn-info action-clear-values">Clear values</button>
                                    </div>
                                @show
                            </div>
                        </div>
                    @show
                </form>
        </div>
        <div class="col-md-4">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#tab-rules-data" aria-controls="tab-rules-data" role="tab" data-toggle="tab">Rules data</a></li>
                <li role="presentation"><a href="#tab-form-data" aria-controls="tab-form-data" role="tab" data-toggle="tab">Form data</a></li>
                <li role="presentation"><a href="#tab-controls-data" aria-controls="tab-controls-data" role="tab" data-toggle="tab">Controls data</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" id="tab-rules-data" class="tab-pane fade in active"></div>
                <div role="tabpanel" id="tab-form-data" class="tab-pane fade"></div>
                <div role="tabpanel" id="tab-controls-data" class="tab-pane fade"></div>
            </div>
        </div>
    </div>
</div>


<script src="{{ asset('vendor/laravel-jquery-validation/vendor/jquery/dist/jquery.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/bootstrap/dist/js/bootstrap.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/jquery.validate/dist/jquery.validate.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/jquery.validate/dist/additional-methods.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/jquery-form/jquery.form.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/jquery-ui/ui/widget.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/highlightjs/highlight.pack.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/vendor/lodash/lodash.min.js') }}"></script>

<script src="{{ asset('vendor/laravel-jquery-validation/jquery.validate.laravel.dev.js') }}"></script>
<script src="{{ asset('vendor/laravel-jquery-validation/demo.js') }}"></script>

@stack('scripts')

@section('init-script')
    {!! app('laraval')->init() !!}
@show

@section('boot-script')
    <script>
        $(function () {
            $('#demo-form-local').validateLaravel({
                mode: 'local'
            })
            demo.extend({
                jsonFilePath: '{{ asset('vendor/laravel-jquery-validation/demo-data.json') }}'
            });
            demo.init();
        })
    </script>
@show


</body>
</html>
