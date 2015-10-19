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
    <link rel="stylesheet" href="{{ asset('vendor/laraval/vendor/bootstrap/dist/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laraval/vendor/bootstrap/dist/css/bootstrap-theme.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laraval/vendor/highlightjs/styles/tomorrow.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/laraval/demo.css') }}">
    <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAFT0lEQVRoQ+2YbYhUVRjHn/+dxo2SFiGkD4UaKtU6s3vPtejLqpVfIuwVNYMkg63Q0DCIoixrJYo+hORL2YsIkYVk4QcjjDYj0LJzzuy0G62tpEWJkJq05k7NnifOdme53p1hZu8d10nu/TJnZs7znP/v/M/LPQd0gT+4wPkoAfy/O5w4mDjY4D2QDNEGN6iqvMTBql3U4BUSBxvcoKryxs3BlpaWiQAmNTU1FY8fP37y8OHDg1XV1aHCOQPMZDKT0un0QgB3MPNsAJNDeg8x835jzI5UKrVbSvlPHXhGpag74PTp0y9rbm5+ipkfBTCxFtHMfISZO7XW7xAR1xJTa50RQCGEFfSaH9gupfzKloUQ6wA8bcvMPEMp1V8pued5NxHRNiK6qlYBwXrMvBfAUinlz5Xis9nsrHQ6/Z393xizRmu9zpZd153vOM4eP65DSvmWLdcNUAixDMAWIrooClwg5mixWLytu7tbl8tzXgCFEIuJaDuAeg3534noRinloTDkuAO2tra2pFIpCaDJF/MDM39GRAsATKnFTWbeB+BLIlpFRBf7Mb2nTp3y+vv7C8Ec4w3oCCG+BjC7JIKZn1BKvUJEjuu6ix3HWUtEvzLz9wBO+kP4cmZuIyK7cq5WSu335/tuALcGcr2olBqe/6VnXAGFEIsAfBByaZGUckctzoXrCCE2Alge+P1MoVCY1tPTc+x8AX4D4PqgUGPMSq11aTUeE6cQ4kMAd4eCOqWUz447YCaTuXrChAmjFgFjzBKt9ftjIvMrCyFeB/BwMJaZ+5VSM+oBuICIVthEQ0NDj3d3d/fasuu6SwHcN7ynAMuklEf9+dLhbwtBPV1SypujwNkYz/OaiegIEdnPkccYM1VrbX+3eqYAeMOWmXmb1nq7Lbe1tbU5jvOSH/SqUurTYc1RxZSZL7bBh5RSb0bN6UO+R0RLQjnuklJ+HCVvZEDP8z4iojtDPT1Pa703ipBSjBBiLYDnQjlWSCk3RckbGVAIsQfA/NB8uUUp9XkUIaUYz/M6ieiZUMc9qbV+OUreyIDlHGTm+5VS70YREnDwbQAPhnIsl1JujpI3MqAQYguAjlCjm6WUwX1szJo8z+sjopmhwMh7a2RAz/MsyMaQkBMDAwNT+/r6/hwz2X8nl3b/le2s8KGhoZm5XO7HKDnjAGaIKB9ulJm3KqXCQ6yqNn+LsEe0WaHKx6SUV1RNUKFCZEB/SbfnsmFBzDxQOuAy865isfhYPp//qRZhruvOBbAZwLVlOszuaatryVOuTixA13UfcRzHTn770txuN2hm3gngUvu+wMxfADhQKBQ29fT0/BIU4LruHAALich+ZsuJY2ZjjLkm6vC0OWMBep6XZuYcgOuY+W8Ac5h5MoBdJcH2FKGUssPZBCGy2ey0dDp9sMoBOfaiFQvQCvYXhi4iSjHzAaXUDa7r3gtgFQB7c7ap0ulCCHEQwMh7ZrADmPk3Y0xLLpf7I+rwjO1gqWHP81YS0Xr/+8h9SDVhQgg7hOeWqfeXMWau1vrbajmq/R/bwQDkC0S0xv/excz2lH/GGLNPa/1JOSHlAJn5NDMvrBRTDSj8f90A/eFqL542ENElgYbOOs8FBYQB7fUhEd2jlJJjBalUv66AthF7nHEcZz0z324voZh51LVDwHU7d+cR0Rlm3lAsFp/P5/On6wVXtzlYTlBra+tMx3EeIKKdleaSvY0DcOXg4ODW3t7eE/UEK+Wqu4PnQmScnAlgnN5rhNjEwUZwIY6GxME4vdcIsYmDjeBCHA2Jg3F6rxFiEwcbwYU4GhIH4/ReI8T+C98tuldzY5biAAAAAElFTkSuQmCC">
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
                                <div class="col-md-offset-3 col-md-9">
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
                            </div>
                        @show
                    </form>
            </div>
            <div class="col-md-4 fade" id="demo-code-preview">
            </div>
        </div>
    @show
</div>


<script src="{{ asset('vendor/laraval/vendor/jquery/dist/jquery.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/bootstrap/dist/js/bootstrap.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/jquery.validate/dist/jquery.validate.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/jquery.validate/dist/additional-methods.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/jquery-form/jquery.form.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/jquery.slimscroll/jquery.slimscroll.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/highlightjs/highlight.pack.js') }}"></script>
<script src="{{ asset('vendor/laraval/vendor/lodash/lodash.min.js') }}"></script>

<script src="{{ asset('vendor/laraval/jquery.validate.laravel.dev.js') }}"></script>
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
    <script> $(function () { demo.init(); }); </script>
@show

@stack('scripts')



</body>
</html>
