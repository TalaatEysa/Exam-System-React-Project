<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;
    protected $fillable = ['exam_name', 'description', 'created_by', 'duration'];

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function creator(){
        return $this->belongsTo(User::class, 'created_by');
    }

    public function results(){
        return $this->hasMany(Result::class);
    }
}
