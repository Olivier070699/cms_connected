<?php

namespace Drupal\cc_price;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\user\EntityOwnerInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining a price entity type.
 */
interface PriceInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

  /**
   * Gets the price creation timestamp.
   *
   * @return int
   *   Creation timestamp of the price.
   */
  public function getCreatedTime();

  /**
   * Sets the price creation timestamp.
   *
   * @param int $timestamp
   *   The price creation timestamp.
   *
   * @return \Drupal\cc_price\PriceInterface
   *   The called price entity.
   */
  public function setCreatedTime($timestamp);

}
