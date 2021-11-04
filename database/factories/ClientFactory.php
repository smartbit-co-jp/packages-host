<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = Faker::create();

        return [
            'name' => $faker->unique()->firstName()." ".$faker->unique()->lastName(),
            'address' => $faker->words(2, true),
            'phone' => $faker->randomNumber(5),
            'fax' => $faker->randomNumber(6),
        ];
    }
}
