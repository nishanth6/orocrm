<?php

namespace Oro\Bundle\TaskBundle\Tests\Unit\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

use Oro\Bundle\TaskBundle\Validator\Constraints\DueDateRequired;

class DueDateRequiredTest extends \PHPUnit_Framework_TestCase
{
    /** @var DueDateRequired */
    protected $constraint;

    protected function setUp()
    {
        $this->constraint = new DueDateRequired();
    }

    protected function tearDown()
    {
        unset($this->constraint);
    }

    public function testConfiguration()
    {
        $this->assertEquals('oro_task.due_date_required_validator', $this->constraint->validatedBy());
        $this->assertEquals(Constraint::CLASS_CONSTRAINT, $this->constraint->getTargets());
    }
}
