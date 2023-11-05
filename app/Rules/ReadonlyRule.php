<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ReadonlyRule implements ValidationRule
{
    public function __toString()
    {
        return 'readonly';
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $fail('validation.readonly')->translate();
    }

    public function passes($attribute, $value, $parameters = [], $validator = null)
    {
        return false;
    }

    public function message()
    {
        return __('validation.readonly');
    }
}
