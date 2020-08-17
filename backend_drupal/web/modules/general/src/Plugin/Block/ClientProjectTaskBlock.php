<?php

namespace Drupal\general\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\views\Views;

/**
 * Provides a client project task block.
 *
 * @Block(
 *   id = "general_client_project_task",
 *   admin_label = @Translation("Client Project Task"),
 *   category = @Translation("Custom")
 * )
 */
class ClientProjectTaskBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $price = Views::getView('price');
    $price->execute();
    $price_result = $price->result;
    $transportPrice = $price_result[0]->_entity->get('field_transportkosten')->getString();
    $saleryPrice = $price_result[0]->_entity->get('field_uurtarief')->getString();

    $hours = Views::getView('project_tasks');
    $hours->execute();
    $hours_result = $hours->result;

    $totalWorkTransport = [];
    $totalWorkPrice = [];
    $totalAmount = [];

    foreach($hours_result as $hour){
      $entity = $hour->_entity;
      $start = $entity->get('field_startuur')->getString();
      $eind = $entity->get('field_einduur')->getString();
      $totalWorkHours = ($eind - $start) / 3600;
      $transportHours = $entity->get('field_transport')->getString();

      $totalWorkHoursPrice =  $totalWorkHours * $saleryPrice;
      $totalWorkTransportPrice =   $transportHours * $transportPrice;
      $total = $totalWorkHoursPrice + $totalWorkTransportPrice;


      array_push($totalWorkPrice, $totalWorkHoursPrice);
      array_push($totalWorkTransport, $totalWorkTransportPrice);
      array_push($totalAmount, $total);


    }
    return [
      'total' => $totalAmount,
    ];
  }

}
