<?php

namespace Drupal\cc_price\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the price entity edit forms.
 */
class PriceForm extends ContentEntityForm {

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
      $this->messenger()->addStatus($this->t('New price %label has been created.', $message_arguments));
      $this->logger('cc_price')->notice('Created new price %label', $logger_arguments);
    }
    else {
      $this->messenger()->addStatus($this->t('The price %label has been updated.', $message_arguments));
      $this->logger('cc_price')->notice('Updated new price %label.', $logger_arguments);
    }

    $form_state->setRedirect('entity.price.canonical', ['price' => $entity->id()]);
  }

}
