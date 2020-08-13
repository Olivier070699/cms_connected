<?php

namespace Drupal\cc_task;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\user\EntityOwnerInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining a task entity type.
 */
interface TaskInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

  /**
   * Gets the task creation timestamp.
   *
   * @return int
   *   Creation timestamp of the task.
   */
  public function getCreatedTime();

  /**
   * Sets the task creation timestamp.
   *
   * @param int $timestamp
   *   The task creation timestamp.
   *
   * @return \Drupal\cc_task\TaskInterface
   *   The called task entity.
   */
  public function setCreatedTime($timestamp);

}
