/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ExtensionContext } from 'vscode';
import { resolve } from '../../../util/vs/base/common/path';
import { baseActivate } from '../vscode/extension';
import { vscodeNodeContributions } from './contributions';
import { registerServices } from './services';

// ###############################################################################################
// ###                                                                                         ###
// ###                 Node extension that runs ONLY in node.js extension host.                ###
// ###                                                                                         ###
// ### !!! Prefer to add code in ../vscode/extension.ts to support all extension runtimes !!!  ###
// ###                                                                                         ###
// ###############################################################################################

//#region TODO@bpasero this needs cleanup
import '../../intents/node/allIntents';

function configureDevPackages() {
	try {
		const sourceMapSupport = require('source-map-support');
		sourceMapSupport.install();
		const dotenv = require('dotenv');
		dotenv.config({ path: [resolve(__dirname, '../.env')] });
	} catch (err) {
		console.error(err);
	}
}
//#endregion

// See https://code.visualstudio.com/api/get-started/extension-anatomy#extension-entry-file

// this method is called when your extension is activated
export function activate(context: ExtensionContext, forceActivation?: boolean) {
	console.log('🚀 Activating Extension: ', context);
	return baseActivate({
		context,
		registerServices,
		contributions: vscodeNodeContributions,
		configureDevPackages,
		forceActivation
	});
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log('👋 Deactivating Extension.');
}