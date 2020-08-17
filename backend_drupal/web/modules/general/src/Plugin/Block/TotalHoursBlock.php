<?php

namespace Drupal\general\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Views\Views;

/**
 * Provides a total hours block.
 *
 * @Block(
 *   id = "general_total_hours",
 *   admin_label = @Translation("Total hours"),
 *   category = @Translation("Custom")
 * )
 */
class TotalHoursBlock extends BlockBase {

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

    $totalWorkHoursPrice = 0;
    $totalWorkTransport = 0;

    foreach($hours_result as $hour){
      $entity = $hour->_entity;
      $start = $entity->get('field_startuur')->getString();
      $eind = $entity->get('field_einduur')->getString();
      $totalWorkHours = ($eind - $start) / 3600;
      $transportHours = $entity->get('field_transport')->getString();

      $totalWorkHoursPrice = $totalWorkHoursPrice + ($totalWorkHours * $saleryPrice);
      $totalWorkTransport =  $totalWorkTransport + ($transportHours * $transportPrice);

    }

    $total = $totalWorkTransport + $totalWorkHoursPrice;


    return [
      'total' => $total,
    ];
  }

}
