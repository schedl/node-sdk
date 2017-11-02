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

class DiscoveryV1 extends BaseService {

  name: string; // set by prototype to 'discovery'
  version: string; // set by prototype to 'v1'
  _options: any // set by BaseService

  static VERSION_DATE_2017_09_01: string = '2017-09-01';

  static VERSION_DATE_2017_08_01: string = '2017-08-01';

  static VERSION_DATE_2017_07_19: string = '2017-07-19';

  static VERSION_DATE_2017_06_25: string = '2017-06-25';

  static VERSION_DATE_2016_12_01: string = '2016-12-01';

  static URL: string = 'https://gateway.watsonplatform.net/discovery/api';

  /**
   * Construct a DiscoveryV1 object.
   *
   * @param {Object} options
   * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
   * @constructor
   */
  constructor(options: DiscoveryV1.Options) {
    super(options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified, use DiscoveryV1.VERSION_DATE_2017_09_01');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * environments
   ************************/

  /**
   * Add an environment.
   *
   * Creates a new environment.  You can create only one environment per service instance. An attempt to create another environment results in an error.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {number} [params.size] - **Deprecated**: Size of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   */
  createEnvironment(params: DiscoveryV1.CreateEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): ReadableStream | void {
    const requiredParams = ['name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description, size: params.size };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'POST',
        json: true,
        body: body,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Delete environment.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteEnvironment(params: DiscoveryV1.DeleteEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteEnvironmentResponse>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get environment info.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getEnvironment(params: DiscoveryV1.GetEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List environments.
   *
   * List existing environments for the service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Show only the environment with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listEnvironments(params?: DiscoveryV1.ListEnvironmentsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListEnvironmentsResponse>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const query = { name: params.name };
    const parameters = {
      options: {
        url: '/v1/environments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List fields in specified collecitons.
   *
   * Gets a list of the unique fields (and their types) stored in the indexes of the specified collecitons.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listFields(params: DiscoveryV1.ListFieldsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { collection_ids: params.collection_ids };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/fields',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Update an environment.
   *
   * Updates an environment. The environment's `name` and  `description` parameters can be changed. You must specify a `name` for the environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Name that identifies the environment.
   * @param {string} [params.description] - Description of the environment.
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateEnvironment(params: DiscoveryV1.UpdateEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Environment>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * configurations
   ************************/

  /**
   * Add configuration.
   *
   * Creates a new configuration.  If the input configuration contains the `configuration_id`, `created`, or `updated` properties, then they are ignored and overridden by the system, and an error is not returned so that the overridden fields do not need to be removed when copying a configuration.  The configuration can contain unrecognized JSON fields. Any such fields are ignored and do not generate an error. This makes it easier to use newer configuration files with older versions of the API and the service. It also makes it possible for the tooling to add additional metadata and information to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Function} [callback] - The callback that handles the response.
   */
  createConfiguration(params: DiscoveryV1.CreateConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): ReadableStream | void {
    const requiredParams = ['environment_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description, conversions: params.conversions, enrichments: params.enrichments, normalizations: params.normalizations };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Delete a configuration.
   *
   * The deletion is performed unconditionally. A configuration deletion request succeeds even if the configuration is referenced by a collection or document ingestion. However, documents that have already been submitted for processing continue to use the deleted configuration. Documents are always processed with a snapshot of the configuration as it existed at the time the document was submitted.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteConfiguration(params: DiscoveryV1.DeleteConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteConfigurationResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, configuration_id: params.configuration_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get configuration details.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getConfiguration(params: DiscoveryV1.GetConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): ReadableStream | void {
    const requiredParams = ['environment_id', 'configuration_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, configuration_id: params.configuration_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List configurations.
   *
   * Lists existing configurations for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Find configurations with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listConfigurations(params: DiscoveryV1.ListConfigurationsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListConfigurationsResponse>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { name: params.name };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Update a configuration.
   *
   * Replaces an existing configuration.   * Completely replaces the original configuration.   * The `configuration_id`, `updated`, and `created` fields are accepted in the request, but they are ignored, and an error is not generated. It is also acceptable for users to submit an updated configuration with none of the three properties.   * Documents are processed with a snapshot of the configuration as it was at the time the document was submitted to be ingested. This means that already submitted documents will not see any updates made to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.configuration_id - The ID of the configuration.
   * @param {string} params.name - The name of the configuration.
   * @param {string} [params.description] - The description of the configuration, if available.
   * @param {Conversions} [params.conversions] - The document conversion settings for the configuration.
   * @param {Enrichment[]} [params.enrichments] - An array of document enrichment settings for the configuration.
   * @param {NormalizationOperation[]} [params.normalizations] - Defines operations that can be used to transform the final output JSON into a normalized form. Operations are executed in the order that they appear in the array.
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateConfiguration(params: DiscoveryV1.UpdateConfigurationParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Configuration>): ReadableStream | void {
    const requiredParams = ['environment_id', 'configuration_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description, conversions: params.conversions, enrichments: params.enrichments, normalizations: params.normalizations };
    const path = { environment_id: params.environment_id, configuration_id: params.configuration_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/configurations/{configuration_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * testYourConfigurationOnADocument
   ************************/

  /**
   * Test configuration.
   *
   * Runs a sample document through the default or your configuration and returns diagnostic information designed to help you understand how the document was processed. The document is not added to the index.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.configuration] - The configuration to use to process the document. If this part is provided, then the provided configuration is used to process the document. If the `configuration_id` is also provided (both are present at the same time), then request is rejected. The maximum supported configuration size is 1 MB. Configuration parts larger than 1 MB are rejected. See the `GET /configurations/{configuration_id}` operation for an example configuration.
   * @param {string} [params.step] - Specify to only run the input document through the given step instead of running the input document through the entire ingestion workflow. Valid values are `convert`, `enrich`, and `normalize`.
   * @param {string} [params.configuration_id] - The ID of the configuration to use to process the document. If the `configuration` form part is also provided (both are present at the same time), then request will be rejected.
   * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   */
  testConfigurationInEnvironment(params: DiscoveryV1.TestConfigurationInEnvironmentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TestDocument>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = <any> {
      file: helper.buildRequestFileObject({data: params.file, contentType: params.file_content_type}), 
    };
    if (params.metadata) {
      formData.metadata = typeof params.metadata === 'object' ? JSON.stringify(params.metadata) : params.metadata;
    }
    if (params.configuration) {
      formData.configuration = typeof params.configuration === 'object'? JSON.stringify(params.configuration): params.configuration;
    }
    const query = { step: params.step, configuration_id: params.configuration_id };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/preview',
        method: 'POST',
        qs: query,
        path: path,
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

  /*************************
   * collections
   ************************/

  /**
   * Create a collection.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.name - The name of the collection to be created.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be created.
   * @param {string} [params.language] - The language of the documents stored in the collection, in the form of an ISO 639-1 language code.
   * @param {Function} [callback] - The callback that handles the response.
   */
  createCollection(params: DiscoveryV1.CreateCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): ReadableStream | void {
    const requiredParams = ['environment_id', 'name'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description, configuration_id: params.configuration_id, language: params.language };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Delete a collection.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteCollection(params: DiscoveryV1.DeleteCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteCollectionResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get collection details.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getCollection(params: DiscoveryV1.GetCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List unique fields.
   *
   * Gets a list of the unique fields (and their types) stored in the index.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listCollectionFields(params: DiscoveryV1.ListCollectionFieldsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionFieldsResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/fields',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * List collections.
   *
   * Lists existing collections for the service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} [params.name] - Find collections with the given name.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listCollections(params: DiscoveryV1.ListCollectionsParams, callback?: DiscoveryV1.Callback<DiscoveryV1.ListCollectionsResponse>): ReadableStream | void {
    const requiredParams = ['environment_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { name: params.name };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Update a collection.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.name - The name of the collection.
   * @param {string} [params.description] - A description of the collection.
   * @param {string} [params.configuration_id] - The ID of the configuration in which the collection is to be updated.
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateCollection(params: DiscoveryV1.UpdateCollectionParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Collection>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { name: params.name, description: params.description, configuration_id: params.configuration_id };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * documents
   ************************/

  /**
   * Add a document.
   *
   * Add a document to a collection with optional metadata.    * The `version` query parameter is still required.    * Returns immediately after the system has accepted the document for processing.    * The user must provide document content, metadata, or both. If the request is missing both document content and metadata, it is rejected.    * The user can set the `Content-Type` parameter on the `file` part to indicate the media type of the document. If the `Content-Type` parameter is missing or is one of the generic media types (for example, `application/octet-stream`), then the service attempts to automatically detect the document's media type.    * The following field names are reserved and will be filtered out if present after normalization: `id`, `score`, `highlight`, and any field with the prefix of: `_`, `+`, or `-`    * Fields with empty name values after normalization are filtered out before indexing.    * Fields containing the following characters after normalization are filtered out before indexing: `#` and `,`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   */
  addDocument(params: DiscoveryV1.AddDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = <any> {
      file: helper.buildRequestFileObject({data: params.file, contentType: params.file_content_type}), 
    };
    if (params.metadata) {
      formData.metadata = typeof params.metadata === 'object' ? JSON.stringify(params.metadata) : params.metadata;
    }
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents',
        method: 'POST',
        path: path,
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
   * Delete a document.
   *
   * If the given document ID is invalid, or if the document is not found, then the a success response is returned (HTTP status code `200`) with the status set to 'deleted'.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteDocument(params: DiscoveryV1.DeleteDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DeleteDocumentResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, document_id: params.document_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Get document details.
   *
   * Fetch status details about a submitted document. **Note:** this operation does not return the document itself. Instead, it returns only the document's processing status and any notices (warnings or errors) that were generated when the document was ingested. Use the query API to retrieve the actual document content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getDocumentStatus(params: DiscoveryV1.GetDocumentStatusParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentStatus>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, document_id: params.document_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Update a document.
   *
   * Replace an existing document. Starts ingesting a document with optional metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.document_id - The ID of the document.
   * @param {ReadableStream|Object|Uint8Array} [params.file] - The content of the document to ingest. The maximum supported file size is 50 megabytes. Files larger than 50 megabytes is rejected.
   * @param {string} [params.metadata] - If you're using the Data Crawler to upload your documents, you can test a document against the type of metadata that the Data Crawler might send. The maximum supported metadata file size is 1 MB. Metadata parts larger than 1 MB are rejected. Example:  ``` {   "Creator": "Johnny Appleseed",   "Subject": "Apples" } ```.
   * @param {string} [params.file_content_type] - The content type of file.
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateDocument(params: DiscoveryV1.UpdateDocumentParams, callback?: DiscoveryV1.Callback<DiscoveryV1.DocumentAccepted>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'document_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = <any> {
      file: helper.buildRequestFileObject({data: params.file, contentType: params.file_content_type}), 
    };
    if (params.metadata) {
      formData.metadata = typeof params.metadata === 'object' ? JSON.stringify(params.metadata) : params.metadata;
    }
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, document_id: params.document_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/documents/{document_id}',
        method: 'POST',
        path: path,
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

  /*************************
   * queries
   ************************/

  /**
   * Query documents in multiple collections.
   *
   * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   */
  federatedQuery(params: DiscoveryV1.FederatedQueryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { collection_ids: params.collection_ids, filter: params.filter, query: params.query, natural_language_query: params.natural_language_query, aggregation: params.aggregation, count: params.count, return_fields: params.return_fields, offset: params.offset, sort: params.sort, highlight: params.highlight, deduplicate: params.deduplicate, deduplicate_field: params.deduplicate_field };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/query',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Query multiple collection system notices.
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string[]} params.collection_ids - A comma-separated list of collection IDs to be queried against.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   */
  federatedQueryNotices(params: DiscoveryV1.FederatedQueryNoticesParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_ids'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { collection_ids: params.collection_ids, filter: params.filter, query: params.query, natural_language_query: params.natural_language_query, aggregation: params.aggregation, count: params.count, return_fields: params.return_fields, offset: params.offset, sort: params.sort, highlight: params.highlight, deduplicate_field: params.deduplicate_field };
    const path = { environment_id: params.environment_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/notices',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Query documents.
   *
   * See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return_fields.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
   * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
   * @param {boolean} [params.deduplicate] - When `true` and used with a Watson Discovery News collection, duplicate results (based on the contents of the `title` field) are removed. Duplicate comparison is limited to the current query only, `offset` is not considered. Defaults to `false`. This parameter is currently Beta functionality.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   */
  query(params: DiscoveryV1.QueryParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { filter: params.filter, query: params.query, natural_language_query: params.natural_language_query, passages: params.passages, aggregation: params.aggregation, count: params.count, return: params.return_fields, offset: params.offset, sort: params.sort, highlight: params.highlight, passages_fields: params.passages_fields, passages_count: params.passages_count, passages_characters: params.passages_characters, deduplicate: params.deduplicate, deduplicate_field: params.deduplicate_field };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/query',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Query system notices.
   *
   * Queries for notices (errors or warnings) that might have been generated by the system. Notices are generated when ingesting documents and performing relevance training. See the [Discovery service documentation](https://console.bluemix.net/docs/services/discovery/using.html) for more details on the query language.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.filter] - A cacheable query that limits the documents returned to exclude any documents that don't mention the query content. Filter searches are better for metadata type searches and when you are trying to get a sense of concepts in the data set.
   * @param {string} [params.query] - A query search returns all documents in your data set with full enrichments and full text, but with the most relevant documents listed first. Use a query search when you want to find the most relevant search results. You cannot use `natural_language_query` and `query` at the same time.
   * @param {string} [params.natural_language_query] - A natural language query that returns relevant documents by utilizing training data and natural language understanding. You cannot use `natural_language_query` and `query` at the same time.
   * @param {boolean} [params.passages] - A passages query that returns the most relevant passages from the results.
   * @param {string} [params.aggregation] - An aggregation search uses combinations of filters and query search to return an exact answer. Aggregations are useful for building applications, because you can use them to build lists, tables, and time series. For a full list of possible aggregrations, see the Query reference.
   * @param {number} [params.count] - Number of documents to return.
   * @param {string[]} [params.return_fields] - A comma separated list of the portion of the document hierarchy to return.
   * @param {number} [params.offset] - The number of query results to skip at the beginning. For example, if the total number of results that are returned is 10, and the offset is 8, it returns the last two results.
   * @param {string[]} [params.sort] - A comma separated list of fields in the document to sort on. You can optionally specify a sort direction by prefixing the field with `-` for descending or `+` for ascending. Ascending is the default sort direction if no prefix is specified.
   * @param {boolean} [params.highlight] - When true a highlight field is returned for each result which contains the fields that match the query with `<em></em>` tags around the matching query terms. Defaults to false.
   * @param {string[]} [params.passages_fields] - A comma-separated list of fields that passages are drawn from. If this parameter not specified, then all top-level fields are included.
   * @param {number} [params.passages_count] - The maximum number of passages to return. The search returns fewer passages if the requested total is not found. The default is `10`. The maximum is `100`.
   * @param {number} [params.passages_characters] - The approximate number of characters that any one passage will have. The default is `400`. The minimum is `50`. The maximum is `2000`.
   * @param {string} [params.deduplicate_field] - When specified, duplicate results based on the field specified are removed from the returned results. Duplicate comparison is limited to the current query only, `offset` is not considered. This parameter is currently Beta functionality.
   * @param {Function} [callback] - The callback that handles the response.
   */
  queryNotices(params: DiscoveryV1.QueryNoticesParams, callback?: DiscoveryV1.Callback<DiscoveryV1.QueryNoticesResponse>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const query = { filter: params.filter, query: params.query, natural_language_query: params.natural_language_query, passages: params.passages, aggregation: params.aggregation, count: params.count, return_fields: params.return_fields, offset: params.offset, sort: params.sort, highlight: params.highlight, passages_fields: params.passages_fields, passages_count: params.passages_count, passages_characters: params.passages_characters, deduplicate_field: params.deduplicate_field };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/notices',
        method: 'GET',
        qs: query,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * trainingData
   ************************/

  /**
   * 
   *
   * Adds a query to the training data for this collection. The query can contain a filter and natural language query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} [params.natural_language_query] - 
   * @param {string} [params.filter] - 
   * @param {TrainingExample[]} [params.examples] - 
   * @param {Function} [callback] - The callback that handles the response.
   */
  addTrainingData(params: DiscoveryV1.AddTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { natural_language_query: params.natural_language_query, filter: params.filter, examples: params.examples };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Adds a new example to this training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} [params.document_id] - 
   * @param {string} [params.cross_reference] - 
   * @param {number} [params.relevance] - 
   * @param {Function} [callback] - The callback that handles the response.
   */
  createTrainingExample(params: DiscoveryV1.CreateTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { document_id: params.document_id, cross_reference: params.cross_reference, relevance: params.relevance };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples',
        method: 'POST',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Clears all training data for this collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteAllTrainingData(params: DiscoveryV1.DeleteAllTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Removes the training data and all associated examples from the training data set.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteTrainingData(params: DiscoveryV1.DeleteTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Removes the example with the given ID for the training data query.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteTrainingExample(params: DiscoveryV1.DeleteTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.Empty>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id, example_id: params.example_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Shows details for a specific training data query, including the query string and all examples.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getTrainingData(params: DiscoveryV1.GetTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingQuery>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Gets the details for this training example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getTrainingExample(params: DiscoveryV1.GetTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id, example_id: params.example_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Lists the training data for this collection.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listTrainingData(params: DiscoveryV1.ListTrainingDataParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingDataSet>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { environment_id: params.environment_id, collection_id: params.collection_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * 
   *
   * Changes the label or cross reference query for this training example.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.environment_id - The ID of the environment.
   * @param {string} params.collection_id - The ID of the collection.
   * @param {string} params.query_id - The ID of the query used for training.
   * @param {string} params.example_id - The ID of the document as it is indexed.
   * @param {string} [params.cross_reference] - 
   * @param {number} [params.relevance] - 
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateTrainingExample(params: DiscoveryV1.UpdateTrainingExampleParams, callback?: DiscoveryV1.Callback<DiscoveryV1.TrainingExample>): ReadableStream | void {
    const requiredParams = ['environment_id', 'collection_id', 'query_id', 'example_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const body = { cross_reference: params.cross_reference, relevance: params.relevance };
    const path = { environment_id: params.environment_id, collection_id: params.collection_id, query_id: params.query_id, example_id: params.example_id };
    const parameters = {
      options: {
        url: '/v1/environments/{environment_id}/collections/{collection_id}/training_data/{query_id}/examples/{example_id}',
        method: 'PUT',
        json: true,
        body: body,
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

}

DiscoveryV1.prototype.name = 'discovery';
DiscoveryV1.prototype.version = 'v1';

/*************************
 * interfaces
 ************************/

namespace DiscoveryV1 {

  export interface Empty { }

  export type Callback<T> = (error: any, body?: T, response?: Request.RequestResponse) => void;

  export interface OptionsHeaders {
    headers?: {
      "X-Watson-Learning-Opt-Out"?: boolean
    }
  }

  export type Options =
    {
      version_date: string;
      headers?: OptionsHeaders;
      url?: string;
      username: string;
      password: string;
    } | {
      version_date: string;
      headers?: OptionsHeaders;
      url?: string;
      username?: string;
      password?: string;
      use_unauthenticated: true;
    }

  /*************************
   * request interfaces
   ************************/

  export interface CreateEnvironmentParams {
    name: string;
    description?: string;
    size?: CreateEnvironmentConstants.Size | number;
  }

  export namespace CreateEnvironmentConstants {
    export enum Size {
      ONE = 1,
      TWO = 2,
      THREE = 3,
    }
  }

  export interface DeleteEnvironmentParams {
    environment_id: string;
  }

  export interface GetEnvironmentParams {
    environment_id: string;
  }

  export interface ListEnvironmentsParams {
    name?: string;
  }

  export interface ListFieldsParams {
    environment_id: string;
    collection_ids: string[];
  }

  export interface UpdateEnvironmentParams {
    environment_id: string;
    name?: string;
    description?: string;
  }

  export interface CreateConfigurationParams {
    environment_id: string;
    name: string;
    description?: string;
    conversions?: Conversions;
    enrichments?: Enrichment[];
    normalizations?: NormalizationOperation[];
  }

  export interface DeleteConfigurationParams {
    environment_id: string;
    configuration_id: string;
  }

  export interface GetConfigurationParams {
    environment_id: string;
    configuration_id: string;
  }

  export interface ListConfigurationsParams {
    environment_id: string;
    name?: string;
  }

  export interface UpdateConfigurationParams {
    environment_id: string;
    configuration_id: string;
    name: string;
    description?: string;
    conversions?: Conversions;
    enrichments?: Enrichment[];
    normalizations?: NormalizationOperation[];
  }

  export interface TestConfigurationInEnvironmentParams {
    environment_id: string;
    configuration?: string;
    step?: TestConfigurationInEnvironmentConstants.Step | string;
    configuration_id?: string;
    file?: ReadableStream|Object|Uint8Array;
    metadata?: string;
    file_content_type?: TestConfigurationInEnvironmentConstants.FileContentType | string;
  }

  export namespace TestConfigurationInEnvironmentConstants {
    export enum Step {
      HTML_INPUT = 'html_input',
      HTML_OUTPUT = 'html_output',
      JSON_OUTPUT = 'json_output',
      JSON_NORMALIZATIONS_OUTPUT = 'json_normalizations_output',
      ENRICHMENTS_OUTPUT = 'enrichments_output',
      NORMALIZATIONS_OUTPUT = 'normalizations_output',
    }
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  export interface CreateCollectionParams {
    environment_id: string;
    name: string;
    description?: string;
    configuration_id?: string;
    language?: CreateCollectionConstants.Language | string;
  }

  export namespace CreateCollectionConstants {
    export enum Language {
      EN = 'en',
      ES = 'es',
      DE = 'de',
      AR = 'ar',
      FR = 'fr',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
      PT_BR = 'pt-br',
    }
  }

  export interface DeleteCollectionParams {
    environment_id: string;
    collection_id: string;
  }

  export interface GetCollectionParams {
    environment_id: string;
    collection_id: string;
  }

  export interface ListCollectionFieldsParams {
    environment_id: string;
    collection_id: string;
  }

  export interface ListCollectionsParams {
    environment_id: string;
    name?: string;
  }

  export interface UpdateCollectionParams {
    environment_id: string;
    collection_id: string;
    name: string;
    description?: string;
    configuration_id?: string;
  }

  export interface AddDocumentParams {
    environment_id: string;
    collection_id: string;
    file?: ReadableStream|Object|Uint8Array;
    metadata?: string;
    file_content_type?: AddDocumentConstants.FileContentType | string;
  }

  export namespace AddDocumentConstants {
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  export interface DeleteDocumentParams {
    environment_id: string;
    collection_id: string;
    document_id: string;
  }

  export interface GetDocumentStatusParams {
    environment_id: string;
    collection_id: string;
    document_id: string;
  }

  export interface UpdateDocumentParams {
    environment_id: string;
    collection_id: string;
    document_id: string;
    file?: ReadableStream|Object|Uint8Array;
    metadata?: string;
    file_content_type?: UpdateDocumentConstants.FileContentType | string;
  }

  export namespace UpdateDocumentConstants {
    export enum FileContentType {
      APPLICATION_JSON = 'application/json',
      APPLICATION_MSWORD = 'application/msword',
      APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      APPLICATION_PDF = 'application/pdf',
      TEXT_HTML = 'text/html',
      APPLICATION_XHTML_XML = 'application/xhtml+xml',
    }
  }

  export interface FederatedQueryParams {
    environment_id: string;
    collection_ids: string[];
    filter?: string;
    query?: string;
    natural_language_query?: string;
    aggregation?: string;
    count?: number;
    return_fields?: string[];
    offset?: number;
    sort?: string[];
    highlight?: boolean;
    deduplicate?: boolean;
    deduplicate_field?: string;
  }

  export interface FederatedQueryNoticesParams {
    environment_id: string;
    collection_ids: string[];
    filter?: string;
    query?: string;
    natural_language_query?: string;
    aggregation?: string;
    count?: number;
    return_fields?: string[];
    offset?: number;
    sort?: string[];
    highlight?: boolean;
    deduplicate_field?: string;
  }

  export interface QueryParams {
    environment_id: string;
    collection_id: string;
    filter?: string;
    query?: string;
    natural_language_query?: string;
    passages?: boolean;
    aggregation?: string;
    count?: number;
    return_fields?: string[];
    offset?: number;
    sort?: string[];
    highlight?: boolean;
    passages_fields?: string[];
    passages_count?: number;
    passages_characters?: number;
    deduplicate?: boolean;
    deduplicate_field?: string;
  }

  export interface QueryNoticesParams {
    environment_id: string;
    collection_id: string;
    filter?: string;
    query?: string;
    natural_language_query?: string;
    passages?: boolean;
    aggregation?: string;
    count?: number;
    return_fields?: string[];
    offset?: number;
    sort?: string[];
    highlight?: boolean;
    passages_fields?: string[];
    passages_count?: number;
    passages_characters?: number;
    deduplicate_field?: string;
  }

  export interface AddTrainingDataParams {
    environment_id: string;
    collection_id: string;
    natural_language_query?: string;
    filter?: string;
    examples?: TrainingExample[];
  }

  export interface CreateTrainingExampleParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
    document_id?: string;
    cross_reference?: string;
    relevance?: number;
  }

  export interface DeleteAllTrainingDataParams {
    environment_id: string;
    collection_id: string;
  }

  export interface DeleteTrainingDataParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
  }

  export interface DeleteTrainingExampleParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
    example_id: string;
  }

  export interface GetTrainingDataParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
  }

  export interface GetTrainingExampleParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
    example_id: string;
  }

  export interface ListTrainingDataParams {
    environment_id: string;
    collection_id: string;
  }

  export interface UpdateTrainingExampleParams {
    environment_id: string;
    collection_id: string;
    query_id: string;
    example_id: string;
    cross_reference?: string;
    relevance?: number;
  }

  /*************************
   * model interfaces
   ************************/

  export interface AggregationResult {
    key?: string;
    matching_results?: number;
    aggregations?: QueryAggregation[];
  }

  export interface Collection {
    collection_id?: string;
    name?: string;
    description?: string;
    created?: string;
    updated?: string;
    status?: string;
    configuration_id?: string;
    language?: string;
    document_counts?: DocumentCounts;
    disk_usage?: CollectionDiskUsage;
    training_status?: TrainingStatus;
  }

  export interface CollectionDiskUsage {
    used_bytes?: number;
  }

  export interface Configuration {
    configuration_id?: string;
    name: string;
    created?: string;
    updated?: string;
    description?: string;
    conversions?: Conversions;
    enrichments?: Enrichment[];
    normalizations?: NormalizationOperation[];
  }

  export interface Conversions {
    pdf?: PdfSettings;
    word?: WordSettings;
    html?: HtmlSettings;
    json_normalizations?: NormalizationOperation[];
  }

  export interface DeleteCollectionResponse {
    collection_id: string;
    status: string;
  }

  export interface DeleteConfigurationResponse {
    configuration_id: string;
    status: string;
    notices?: Notice[];
  }

  export interface DeleteDocumentResponse {
    document_id?: string;
    status?: string;
  }

  export interface DeleteEnvironmentResponse {
    environment_id: string;
    status: string;
  }

  export interface DiskUsage {
    used_bytes?: number;
    maximum_allowed_bytes?: number;
    total_bytes?: number;
    used?: string;
    total?: string;
    percent_used?: number;
  }

  export interface DocumentAccepted {
    document_id?: string;
    status?: string;
    notices?: Notice[];
  }

  export interface DocumentCounts {
    available?: number;
    processing?: number;
    failed?: number;
  }

  export interface DocumentSnapshot {
    step?: string;
    snapshot?: Object;
  }

  export interface DocumentStatus {
    document_id: string;
    configuration_id: string;
    created: string;
    updated: string;
    status: string;
    status_description: string;
    filename?: string;
    file_type?: string;
    sha1?: string;
    notices: Notice[];
  }

  export interface Enrichment {
    description?: string;
    destination_field: string;
    source_field: string;
    overwrite?: boolean;
    enrichment_name: string;
    ignore_downstream_errors?: boolean;
    options?: EnrichmentOptions;
  }

  export interface Environment {
    environment_id?: string;
    name?: string;
    description?: string;
    created?: string;
    updated?: string;
    status?: string;
    read_only?: boolean;
    size?: number;
    index_capacity?: IndexCapacity;
  }

  export interface EnvironmentDocuments {
    indexed?: number;
    maximum_allowed?: number;
  }

  export interface Field {
    field_name?: string;
    field_type?: string;
  }

  export interface FontSetting {
    level?: number;
    min_size?: number;
    max_size?: number;
    bold?: boolean;
    italic?: boolean;
    name?: string;
  }

  export interface HtmlSettings {
    exclude_tags_completely?: string[];
    exclude_tags_keep_content?: string[];
    keep_content?: XPathPatterns;
    exclude_content?: XPathPatterns;
    keep_tag_attributes?: string[];
    exclude_tag_attributes?: string[];
  }

  export interface IndexCapacity {
    documents?: EnvironmentDocuments;
    disk_usage?: DiskUsage;
    memory_usage?: MemoryUsage;
  }

  export interface ListCollectionFieldsResponse {
    fields?: Field[];
  }

  export interface ListCollectionsResponse {
    collections?: Collection[];
  }

  export interface ListConfigurationsResponse {
    configurations?: Configuration[];
  }

  export interface ListEnvironmentsResponse {
    environments?: Environment[];
  }

  export interface MemoryUsage {
    used_bytes?: number;
    total_bytes?: number;
    used?: string;
    total?: string;
    percent_used?: number;
  }

  export interface NormalizationOperation {
    operation?: string;
    source_field?: string;
    destination_field?: string;
  }

  export interface Notice {
    notice_id?: string;
    created?: string;
    document_id?: string;
    query_id?: string;
    severity?: string;
    step?: string;
    description?: string;
  }

  export interface PdfHeadingDetection {
    fonts?: FontSetting[];
  }

  export interface PdfSettings {
    heading?: PdfHeadingDetection;
  }

  export interface QueryAggregation {
    type?: string;
    field?: string;
    results?: AggregationResult[];
    match?: string;
    matching_results?: number;
    aggregations?: QueryAggregation[];
  }

  export interface QueryNoticesResponse {
    matching_results?: number;
    results?: QueryNoticesResult[];
    aggregations?: QueryAggregation[];
    passages?: QueryPassages[];
    duplicates_removed?: number;
  }

  export interface QueryPassages {
    document_id?: string;
    passage_score?: number;
    passage_text?: string;
    start_offset?: number;
    end_offset?: number;
    field?: string;
  }

  export interface QueryResponse {
    matching_results?: number;
    results?: QueryResult[];
    aggregations?: QueryAggregation[];
    passages?: QueryPassages[];
    duplicates_removed?: number;
  }

  export interface QueryResult {
    id?: string;
    score?: number;
    metadata?: Object;
    collection_id?: string;
  }

  export interface TestDocument {
    configuration_id?: string;
    status?: string;
    enriched_field_units?: number;
    original_media_type?: string;
    snapshots?: DocumentSnapshot[];
    notices?: Notice[];
  }

  export interface TrainingDataSet {
    environment_id?: string;
    collection_id?: string;
    queries?: TrainingQuery[];
  }

  export interface TrainingExample {
    document_id?: string;
    cross_reference?: string;
    relevance?: number;
  }

  export interface TrainingQuery {
    query_id?: string;
    natural_language_query?: string;
    filter?: string;
    examples?: TrainingExample[];
  }

  export interface TrainingStatus {
    total_examples?: number;
    available?: boolean;
    processing?: boolean;
    minimum_queries_added?: boolean;
    minimum_examples_added?: boolean;
    sufficient_label_diversity?: boolean;
    notices?: number;
    successfully_trained?: string;
    data_updated?: string;
  }

  export interface WordHeadingDetection {
    fonts?: FontSetting[];
    styles?: WordStyle[];
  }

  export interface WordSettings {
    heading?: WordHeadingDetection;
  }

  export interface WordStyle {
    level?: number;
    names?: string[];
  }

  export interface XPathPatterns {
    xpaths?: string[];
  }

  export interface EnrichmentOptions {
    extract?: string[];
    sentiment?: boolean;
    quotations?: boolean;
    show_source_text?: boolean;
    hierarchical_typed_relations?: boolean;
    model?: string;
    language?: string;
  }

  export interface QueryNoticesResult {
    id?: string;
    score?: number;
    metadata?: Object;
    collection_id?: string;
  }

}

export = DiscoveryV1;
