<?php

namespace Drupal\cc_client;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining a client entity type.
 */
interface ClientInterface extends ContentEntityInterface, EntityChangedInterface {

  /**
   * Gets the client title.
   *
   * @return string
   *   Title of the client.
   */
  public function getTitle();

  /**
   * Sets the client title.
   *
   * @param string $title
   *   The client title.
   *
   * @return \Drupal\cc_client\ClientInterface
   *   The called client entity.
   */
  public function setTitle($title);

  /**
   * Gets the client creation timestamp.
   *
   * @return int
   *   Creation timestamp of the client.
   */
  public function getCreatedTime();

  /**
   * Sets the client creation timestamp.
   *
   * @param int $timestamp
   *   The client creation timestamp.
   *
   * @return \Drupal\cc_client\ClientInterface
   *   The called client entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the client status.
   *
   * @return bool
   *   TRUE if the client is enabled, FALSE otherwise.
   */
  public function isEnabled();

  /**
   * Sets the client status.
   *
   * @param bool $status
   *   TRUE to enable this client, FALSE to disable.
   *
   * @return \Drupal\cc_client\ClientInterface
   *   The called client entity.
   */
  public function setStatus($status);

}
