<?php

/**
 * @file
 * Theme settings form for connected theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function connected_form_system_theme_settings_alter(&$form, &$form_state) {

  $form['connected'] = [
    '#type' => 'details',
    '#title' => t('connected'),
    '#open' => TRUE,
  ];

  $form['connected']['font_size'] = [
    '#type' => 'number',
    '#title' => t('Font size'),
    '#min' => 12,
    '#max' => 18,
    '#default_value' => theme_get_setting('font_size'),
  ];

}
