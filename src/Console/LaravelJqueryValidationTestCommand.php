<?php

namespace Radic\LaravelJqueryValidation\Console;

use Caffeinated\Beverage\Command;

class LaravelJqueryValidationTestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var  string
     */
    protected $signature = 'laravel-jquery-validation:test';

    /**
     * The console command description.
     *
     * @var  string
     */
    protected $description = 'laravel-jquery-validation test command';

    /**
     * Execute the console command.
     *
     * @return  mixed
     */
    public function handle()
    {
        $this->line('Test');
    }
}
