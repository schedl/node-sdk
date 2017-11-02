/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Request = require('request'); 
import extend = require('extend');
import requestFactory = require('../lib/requestwrapper');
import helper = require('../lib/helper');
import util = require('util');
import BaseService = require('../lib/base_service');

class LanguageTranslatorV2 extends BaseService {

  name: string; // set by prototype to 'language_translator'
  version: string; // set by prototype to 'v2'
  _options: any // set by BaseService

  static URL: string = 'https://gateway.watsonplatform.net/language-translator/api';

  /**
   * Construct a LanguageTranslatorV2 object.
   *
   * @param {Object} options
   * @constructor
   */
  constructor(options: LanguageTranslatorV2.Options) {
    super(options);
  }

  /*************************
   * translate
   ************************/

  /**
   * Translates the input text from the source language to the target language.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.text - Input text in UTF-8 encoding. It is a list so that multiple paragraphs can be submitted. Also accept a single string, instead of an array, as valid input.
   * @param {string} [params.model_id] - The unique model_id of the translation model being used to translate text. The model_id inherently specifies source language, target language, and domain. If the model_id is specified, there is no need for the source and target parameters and the values are ignored.
   * @param {string} [params.source] - Used in combination with target as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
   * @param {string} [params.target] - Used in combination with source as an alternative way to select the model for translation. When target and source are set, and model_id is not set, the system chooses a default model with the right language pair to translate (usually the model based on the news domain).
   * @param {Function} [callback] - The callback that handles the response.
   */
  translate(params: LanguageTranslatorV2.TranslateParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.TranslationResult>): ReadableStream | void {
    const requiredParams = ['text'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { text: params.text, model_id: params.model_id, source: params.source, target: params.target };
    const parameters = {
      options: {
        url: '/v2/translate',
        method: 'POST',
        json: true,
        body: body,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * identify
   ************************/

  /**
   * Identifies the language of the input text.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - Input text in UTF-8 format.
   * @param {Function} [callback] - The callback that handles the response.
   */
  identify(params: LanguageTranslatorV2.IdentifyParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.IdentifiedLanguages>): ReadableStream | void {
    const requiredParams = ['text'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { text: params.text };
    const parameters = {
      options: {
        url: '/v2/identify',
        method: 'POST',
        json: true,
        body: body,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'text/plain'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Lists all languages that can be identified by the API.
   *
   * Lists all languages that the service can identify. Returns the two-letter code (for example, `en` for English or `es` for Spanish) and name of each language.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listIdentifiableLanguages(params?: LanguageTranslatorV2.ListIdentifiableLanguagesParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.IdentifiableLanguages>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const parameters = {
      options: {
        url: '/v2/identifiable_languages',
        method: 'GET',
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * models
   ************************/

  /**
   * Uploads a TMX glossary file on top of a domain to customize a translation model.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.base_model_id - Specifies the domain model that is used as the base for the training. To see current supported domain models, use the GET /v2/models parameter.
   * @param {string} [params.name] - The model name. Valid characters are letters, numbers, -, and _. No spaces.
   * @param {ReadableStream|Object|Uint8Array} [params.forced_glossary] - A TMX file with your customizations. The customizations in the file completely overwrite the domain data translation, including high frequency or high confidence phrase translations. You can upload only one glossary with a file size less than 10 MB per call.
   * @param {ReadableStream|Object|Uint8Array} [params.parallel_corpus] - A TMX file that contains entries that are treated as a parallel corpus instead of a glossary.
   * @param {ReadableStream|Object|Uint8Array} [params.monolingual_corpus] - A UTF-8 encoded plain text file that is used to customize the target language model.
   * @param {Function} [callback] - The callback that handles the response.
   */
  createModel(params: LanguageTranslatorV2.CreateModelParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.TranslationModel>): ReadableStream | void {
    const requiredParams = ['base_model_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      forced_glossary: helper.buildRequestFileObject({data: params.forced_glossary, contentType: 'application/octet-stream'}), 
      parallel_corpus: helper.buildRequestFileObject({data: params.parallel_corpus, contentType: 'application/octet-stream'}), 
      monolingual_corpus: helper.buildRequestFileObject({data: params.monolingual_corpus, contentType: 'text/plain'}),
    };
    const query = { base_model_id: params.base_model_id, name: params.name };
    const parameters = {
      options: {
        url: '/v2/models',
        method: 'POST',
        qs: query,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Deletes a custom translation model.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - The model identifier.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteModel(params: LanguageTranslatorV2.DeleteModelParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.DeleteModelResult>): ReadableStream | void {
    const requiredParams = ['model_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { model_id: params.model_id };
    const parameters = {
      options: {
        url: '/v2/models/{model_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get information about the given translation model, including training status.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.model_id - Model ID to use.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getModel(params: LanguageTranslatorV2.GetModelParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.TranslationModel>): ReadableStream | void {
    const requiredParams = ['model_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { model_id: params.model_id };
    const parameters = {
      options: {
        url: '/v2/models/{model_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Lists available standard and custom models by source or target language.
   *
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.source] - Filter models by source language.
   * @param {string} [params.target] - Filter models by target language.
   * @param {boolean} [params.default_models] - Valid values are leaving it unset, `true`, and `false`. When `true`, it filters models to return the default_models model or models. When `false`, it returns the non-default_models model or models. If not set, it returns all models, default_models and non-default_models.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listModels(params?: LanguageTranslatorV2.ListModelsParams, callback?: LanguageTranslatorV2.Callback<LanguageTranslatorV2.TranslationModels>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const query = { source: params.source, target: params.target, default: params.default_models };
    const parameters = {
      options: {
        url: '/v2/models',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

}

LanguageTranslatorV2.prototype.name = 'language_translator';
LanguageTranslatorV2.prototype.version = 'v2';

/*************************
 * interfaces
 ************************/

namespace LanguageTranslatorV2 {

  export interface Empty { }

  export type Callback<T> = (error: any, body?: T, response?: Request.RequestResponse) => void;

  export interface OptionsHeaders {
    headers?: {
      "X-Watson-Learning-Opt-Out"?: boolean
    }
  }

  export type Options =
    {
      headers?: OptionsHeaders;
      url?: string;
      username: string;
      password: string;
    } | {
      headers?: OptionsHeaders;
      url?: string;
      username?: string;
      password?: string;
      use_unauthenticated: true;
    }

  /*************************
   * request interfaces
   ************************/

  export interface TranslateParams {
    text: string[];
    model_id?: string;
    source?: string;
    target?: string;
  }

  export interface IdentifyParams {
    text: string;
  }

  export interface ListIdentifiableLanguagesParams {
  }

  export interface CreateModelParams {
    base_model_id: string;
    name?: string;
    forced_glossary?: ReadableStream|Object|Uint8Array;
    parallel_corpus?: ReadableStream|Object|Uint8Array;
    monolingual_corpus?: ReadableStream|Object|Uint8Array;
  }

  export interface DeleteModelParams {
    model_id: string;
  }

  export interface GetModelParams {
    model_id: string;
  }

  export interface ListModelsParams {
    source?: string;
    target?: string;
    default_models?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  export interface DeleteModelResult {
    status: string;
  }

  export interface IdentifiableLanguage {
    language: string;
    name: string;
  }

  export interface IdentifiableLanguages {
    languages: IdentifiableLanguage[];
  }

  export interface IdentifiedLanguage {
    language: string;
    confidence: number;
  }

  export interface IdentifiedLanguages {
    languages: IdentifiedLanguage[];
  }

  export interface Translation {
    translation_output: string;
  }

  export interface TranslationModel {
    model_id: string;
    name?: string;
    source?: string;
    target?: string;
    base_model_id?: string;
    domain?: string;
    customizable?: boolean;
    default_model?: boolean;
    owner?: string;
    status?: string;
  }

  export interface TranslationModels {
    models: TranslationModel[];
  }

  export interface TranslationResult {
    word_count: number;
    character_count: number;
    translations: Translation[];
  }

}

export = LanguageTranslatorV2;
