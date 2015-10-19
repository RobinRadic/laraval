<?php
/**
 * Part of the Caffeinated PHP packages.
 *
 * MIT License and copyright information bundled with this package in the LICENSE file
 */
namespace Radic\Laraval\Strategies;

use Caffeinated\Beverage\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * This is the LocalValidationMode.
 *
 * @package        Radic\Laraval
 * @author         Caffeinated Dev Team
 * @copyright      Copyright (c) 2015, Caffeinated
 * @license        https://tldrlegal.com/license/mit-license MIT License
 */
class AjaxValidationStrategy extends ValidationStrategy
{

    protected $viewFile = 'laraval::init-ajax';

    protected $singleFieldReferenceKey = '__laraval_validate_field_name';

    /**
     * @inheritDoc
     */
    public function getName()
    {
        return 'ajax';
    }

    public function init(array $options = [ ], $force = false)
    {
        return parent::init(array_replace_recursive([
            'defaults' => [
                'singleFieldReferenceKey' => $this->singleFieldReferenceKey
            ]
        ], $options), $force);
    }

    public function validate(Request $request, array $rules = [ ], array $messages = [ ])
    {
        $this->getRules()->merge($rules);

        if ($singleField = $request->has($this->singleFieldReferenceKey)) {
            $fields = [$request->get($this->singleFieldReferenceKey)];
        } else {
            $fields = Arr::keys($this->getRules()->toArray());
        }

        $validator = $this->getValidationFactory()->make($request->only($fields), Arr::only($rules, $fields), $messages);


        if ($validator->fails()) {
            $messages  = $validator->getMessageBag();

            if ($singleField) {
                $fieldName = $request->get($this->singleFieldReferenceKey);
                return $this->jsonResponse([ $fieldName => $messages->first($fieldName) ]);
            } else {
                $response = [];
                foreach ($messages->keys() as $key) {
                    $response[$key] = $messages->first($key);
                };

                return $this->jsonResponse($response);
            }
        } else {
            return $this->jsonResponse('true');
        }
    }

    protected function jsonResponse($data = [], $status = 200)
    {
        return $this->getResponseFactory()->json($data, $status);
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
