/**
 * autoinstall-webpack-plugin
 *
 * Auto install deps
 *
 * @flow
 */


import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import { Tapable, SyncHook } from 'tapable'
import { RawSource } from 'webpack-sources'
import chalk from 'chalk'
import { spawn, spawnSync, exec, execSync } from 'child_process'
import install from '@rabbitcc/install'

export default class AutoInstallPlugin extends Tapable {
  constructor(options = {}) {
    super()
    this.options = options
  }

  apply(compiler) {
    this.context = compiler.context
    console.log(compiler.options)

    /**
     * register webpack `watchRun` hook
     */
    compiler.hooks.normalModuleFactory.tap(
      this.description,
      (nmf) => {
        // console.log(compilation)
        // console.log(nmf)
        nmf.hooks.beforeResolve.tapAsync(
          this.description,
          (data, callback) => {
            console.log(data.request)
            if('jquery' == data.request || data.request == 'react') {
              install(data.request).then(callback)
            }
          }
        )
      }
    )
  }
}
