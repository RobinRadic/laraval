<?php

namespace Radic\Tests\LaravelJqueryValidation;

use Caffeinated\Dev\Testing\AbstractTestCase;

abstract class TestCase extends AbstractTestCase
{
    /**
     * {@inheritdoc}
     */
    protected function getServiceProviderClass($app)
    {
        return \Radic\LaravelJqueryValidation\ValidationServiceProvider::class;
    }
}
