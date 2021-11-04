<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    public function clients()
    {
        return $this->hasMany(Client::class, 'company_id', 'id');
    }

    public function jobs()
    {
        return $this->hasMany(Job::class, 'company_id', 'id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'company_id', 'id');
    }
}