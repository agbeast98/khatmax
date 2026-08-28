/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Khatmax logo silhouette path used by the aquarium renderer.
// The aquarium cannot use that SVG file directly because each fish renders the
// logo as live, same-document SVG geometry: fish.ts stores this path in a
// shared <symbol>, then renders clipped <use> slices with staggered CSS
// animations. That keeps the swimming-strip effect, currentColor species
// tinting, and auxiliary-window support while avoiding duplicate path parsing
// per fish.
export const VSCODE_LOGO_PATH = 'M28 6H68C81.2548 6 92 16.7452 92 30V66C92 79.2548 81.2548 90 68 90H28C14.7452 90 4 79.2548 4 66V30C4 16.7452 14.7452 6 28 6Z';
