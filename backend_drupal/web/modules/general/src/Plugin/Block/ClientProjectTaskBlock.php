<?php

namespace Drupal\general\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Datetime\Element\Datetime;
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

    $hours = Views::getView('project_tasks');
    $hours->execute();
    $hours_result = $hours->result;

    $totalWorkTransport = 0;
    $totalWorkPrice = 0;
    $totalAmount = 0;

    foreach($hours_result as $hour){

      $entity = $hour->_entity;
      $start = $entity->get('field_startuur')->getString();
      $eind = $entity->get('field_einduur')->getString();

      $saleryPrice = $price_result[0]->_entity->get('field_uurtarief')->getString();
      $transportPrice = $price_result[0]->_entity->get('field_transportkosten')->getString();

      $pauze = $entity->get('field_pauze')->getString();
      if($pauze !== null)
        $arr = explode(",", $pauze, 2);
        $startPauze = $arr[0];
        $stopPauze = $arr[1];
        $pauzeDuur = $stopPauze-$startPauze;


      $totalWorkHours = ($eind - $start - $pauzeDuur) / 3600;

      $extraHoures = 0;
      if($totalWorkHours > 8){
        $extraHoures = $totalWorkHours - 8;
      }

      $pauzeDuur = 0;
      $transportHours = $entity->get('field_transport')->getString();

      $freelancer = $entity->get('field_freelancer')->getString();
      $check = $freelancer == 1;
      if ($check == true){
        $transportPrice = $entity->get('field_transportkost')->getString();
        $saleryPrice = $entity->get('field_prijs')->getString();
      }

      $date = $entity->get('field_datum')->getString();
      $dayOfWeek = date("l", strtotime($date));

      $totalWorkHoursPrice =  $totalWorkHours * $saleryPrice + $extraHoures * ($saleryPrice * 1.2);
      if($dayOfWeek == 'Saturday'){
        $totalWorkHoursPrice = $totalWorkHoursPrice * 1.5;
      }

      if($dayOfWeek == 'Sunday'){
        $totalWorkHoursPrice = $totalWorkHoursPrice * 2;
      }
      $totalWorkTransportPrice =   $transportHours * $transportPrice;
      $totalWorkTransport = $totalWorkTransport + $totalWorkTransportPrice;
      $totalWorkPrice = $totalWorkPrice + $totalWorkHoursPrice;
    }

    $totalAmount = $totalAmount + $totalWorkPrice + $totalWorkTransport;
    $totalAmount = round($totalAmount, 2);
    $totalWorkTransport = round($totalWorkTransport, 2);
    $totalWorkPrice = round($totalWorkPrice, 2);

    return [
      'work' => $totalWorkPrice,
      'transport' => $totalWorkTransport,
      'total' => $totalAmount,
    ];
  }

}
