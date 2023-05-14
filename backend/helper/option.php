<?php

interface OptionValue {
    public function isSome(): bool;
    public function isNone(): bool;
    public function getValue();
}

final class Some implements OptionValue {
    private $value;

    public function __construct($value) {
        $this->value = $value;
    }

    public function isSome(): bool {
        return true;
    }

    public function isNone(): bool {
        return false;
    }

    public function getValue() {
        return $this->value;
    }
}

final class None implements OptionValue {
    public function isSome(): bool {
        return false;
    }

    public function isNone(): bool {
        return true;
    }

    public function getValue() {
        throw new Exception("Tried to unwrap a None value.");
    }
}

final class Option {
    private $value;

    public function __construct(OptionValue $value) {
        $this->value = $value;
    }

    public function isSome(): bool {
        return $this->value->isSome();
    }

    public function isNone(): bool {
        return $this->value->isNone();
    }

    public function unwrap() {
        return $this->value->getValue();
    }

    public static function fromNullable($value): self {
        return is_null($value) ? new self(new None()) : new self(new Some($value));
    }
}


?>