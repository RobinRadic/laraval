<?php

namespace Radic\Laraval\Console;

use Caffeinated\Beverage\Command;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var  string
     */
    protected $signature = 'laraval:test';

    /**
     * The console command description.
     *
     * @var  string
     */
    protected $description = 'laraval test command';

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
