<?php

namespace App\Models;

use SmartBit\TemplateMaker\Traits\DocumentTemplateTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    use DocumentTemplateTrait;

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

    // loading PDF document from model
    // $company = Company::find(3);
    // $pdf = PDF::loadHtml($company->getDocumentHtml('en'));
    // return $pdf->stream('document_name_here'.'.pdf');

}