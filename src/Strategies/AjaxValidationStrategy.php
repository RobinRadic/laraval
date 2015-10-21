<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Strategies;

use Caffeinated\Beverage\Arr;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Http\Request;

/**
 * This is the AjaxValidationStrategy.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class AjaxValidationStrategy extends ValidationStrategy
{

    protected $singleFieldReferenceKey = '__laraval_validate_field_name';

    /**
     * @var \Illuminate\Contracts\Validation\Factory
     */
    protected $validationFactory;

    /**
     * @var \Illuminate\Contracts\Routing\ResponseFactory
     */
    protected $responseFactory;

    /**
     * @inheritDoc
     */
    public function getName()
    {
        return 'ajax';
    }

    /**
     * init
     *
     * @param \Illuminate\Contracts\Validation\Factory      $validationFactory
     * @param \Illuminate\Contracts\Routing\ResponseFactory $responseFactory
     */
    public function init(ValidationFactory $validationFactory, ResponseFactory $responseFactory)
    {
        $this->validationFactory = $validationFactory;
        $this->responseFactory   = $responseFactory;
    }

    /**
     * @inheritdoc
     */
    public function create($selector = 'form', array $options = [ ], array $data = [ ])
    {
        $options = array_replace_recursive([
            //'messages' => static::flatten($this->messages)
        ], $options);

        $data = array_replace_recursive([
            'rules' => null
        ], $data);

        return parent::create($selector, $options, $data);
    }

    /**
     * Validates a AJAX validation request and returns a JsonResponse
     *
     * @param \Illuminate\Http\Request $request
     * @param array                    $rules
     * @param array                    $messages
     * @return \Illuminate\Http\JsonResponse
     */
    public function validate(Request $request, array $rules = [ ], array $messages = [ ])
    {
        $rules = $this->getRules()->merge($rules)->toArray();

        if ($singleField = $request->has($this->singleFieldReferenceKey)) {
            $fields = [ $request->get($this->singleFieldReferenceKey) ];
        } else {
            $fields = Arr::keys($this->getRules()->toArray());
        }

        $data = $request->only($fields);
        $rules = Arr::only($rules, $fields);

        $validator = $this->validationFactory->make($data, $rules, $messages);

        if ($validator->fails()) {
            $messages = $validator->getMessageBag();

            if ($singleField) {
                $fieldName = $request->get($this->singleFieldReferenceKey);

                return $this->jsonResponse([ $fieldName => $messages->first($fieldName) ]);
            } else {
                $response = [ ];
                foreach ($messages->keys() as $key) {
                    $response[ $key ] = $messages->first($key);
                };

                return $this->jsonResponse($response);
            }
        } else {
            return $this->jsonResponse('true');
        }
    }

    protected function jsonResponse($data = [ ], $status = 200)
    {
        return $this->responseFactory->json($data, $status);
    }

    /**
     * get singleFieldReferenceKey value
     *
     * @return string
     */
    public function getSingleFieldReferenceKey()
    {
        return $this->singleFieldReferenceKey;
    }

    /**
     * Set the singleFieldReferenceKey value
     *
     * @param string $singleFieldReferenceKey
     * @return AjaxValidationStrategy
     */
    public function setSingleFieldReferenceKey($singleFieldReferenceKey)
    {
        $this->singleFieldReferenceKey = $singleFieldReferenceKey;

        return $this;
    }
}
