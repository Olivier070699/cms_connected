<?php

namespace Drupal\cc_task\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the task entity edit forms.
 */
class TaskForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {

    $entity = $this->getEntity();
    $result = $entity->save();
    $link = $entity->toLink($this->t('View'))->toRenderable();

    $message_arguments = ['%label' => $this->entity->label()];
    $logger_arguments = $message_arguments + ['link' => render($link)];

    if ($result == SAVED_NEW) {
      $this->messenger()->addStatus($this->t('New task %label has been created.', $message_arguments));
      $this->logger('cc_task')->notice('Created new task %label', $logger_arguments);
    }
    else {
      $this->messenger()->addStatus($this->t('The task %label has been updated.', $message_arguments));
      $this->logger('cc_task')->notice('Updated new task %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.task.canonical', ['task' => $entity->id()]);
  }

}
