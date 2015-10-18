@extends('laravel-jquery-validation::layout')
@section('title')
    @parent
    :: Local Demo
@stop
@section('form-element')
    <form
        id="demo-form-local"
        action="{{ route('laravel-jquery-validation::demo.store') }}"
        method="POST"
        class="form-horizontal"
    >
        @stop
        @section('form-content')
            <div class="form-group">
                <label class="control-label col-md-3" for="title">Title</label>

                <div class="col-md-9">
                    <input class="form-control" type="text" id="title" name="title" placeholder="Title" data-lvalidate="required|max:15|alpha_num">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-3" for="body">Body</label>

                <div class="col-md-9">
                    <input class="form-control" type="text" id="body" name="body" placeholder="Body" data-lvalidate="required|max:255|alpha_dash">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-md-3" for="json">JSON</label>

                <div class="col-md-9">
                    <input class="form-control" type="text" id="json" name="json" placeholder="JSON" data-lvalidate="json">
                </div>
            </div>



            <div class="form-group has-feedback">
                <label class="control-label col-md-3" for="email">Email</label>

                <div class="col-md-9">
                    <div class="input-group">
                        <span class="input-group-addon">@</span>
                        <input id="email" name="email" placeholder="Email" data-lvalidate="required|email" type="text" class="form-control" aria-describedby="emailStatus">
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
                        <input id="url" name="url" placeholder="URL" data-lvalidate="required|url" type="text" class="form-control" aria-describedby="urlStatus">
                    </div>
                    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    <span id="urlStatus" class="sr-only">(success)</span>
                </div>
            </div>


            <div class="form-group">
                <label class="control-label col-md-3" for="ip">IP</label>

                <div class="col-md-9">
                    <input class="form-control" type="text" id="ip" name="ip" placeholder="IP" data-lvalidate="ip">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-md-3" for="age">Age</label>

                <div class="col-md-9">
                    <input class="form-control" type="number" id="age" name="age" placeholder="Age" data-lvalidate="required|between:18,30|numeric">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-md-3" for="born">Born</label>

                <div class="col-md-9">
                    <input class="form-control" type="date" id="born" name="born" placeholder="Born" data-lvalidate="required|date|after:1/1/2000">
                    <span class="help-block help-block-sm">required|date|after:1/1/2000</span>
                </div>
            </div>

            <div class="form-group">

                <label class="control-label col-md-3" for="died">Died</label>

                <div class="col-md-9">
                    <input class="form-control" type="date" id="died" name="died" placeholder="Dies" data-lvalidate="required|date|after:born">
                    <span class="help-block help-block-sm">required|date|after:born</span>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-md-3">Options</label>

                <div class="col-md-9">
                    <div class="checkbox">
                        <label>
                            <input name="is_admin" id="is_admin" type="checkbox" value="">
                            Admin user
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input name="active" id="active" type="checkbox" value="">
                            Activated
                        </label>
                    </div>
                </div>
            </div>
@stop
