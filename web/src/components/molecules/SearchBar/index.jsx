import React, { useState } from 'react';
import { AutoComplete, Input, Tag } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Router from 'next/router';

import styled from 'styled-components';
import consts from 'claptime/consts';

import { listCollections } from 'claptime/graphql/collections';
import { listProfiles } from 'claptime/graphql/profiles';
import { listVideoNodesByStatusSortByTitle } from 'claptime/graphql/videonodes';
import { useApolloClient } from 'claptime/lib/apollo';
import { debounce, getSearchableValue, listItems } from 'claptime/utils';

const DISPLAY_NUMBER = 5;

const SearchWrapper = styled.div`
  width: 150px;
  @media screen and ${consts.device.tablet} {
    width: 300px;
  }
`;

const SearchBar = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);

  const [searching, setSearching] = useState(false);

  const apolloClient = useApolloClient();

  const renderOption = (item) => {
    let key;
    let text;
    let tag;
    const { __typename: typename, type, nodeType } = item;
    switch (typename) {
      case 'Profile':
        key = `/profile/${item.id}`;
        text = item.name;
        tag = (
          <Tag color="blue" style={{ float: 'right ' }}>
            {t('searchBar.profile')}
          </Tag>
        );
        break;
      case 'VideoNode':
        switch (type) {
          case 'FILM':
            key = `/video/${item.id}`;
            text = item.title;
            switch (nodeType) {
              case 'ROOT':
                tag = (
                  <Tag color="green" style={{ float: 'right ' }}>
                    {t('searchBar.film')}
                  </Tag>
                );
                break;
              case 'NODE':
                tag = (
                  <Tag color="lime" style={{ float: 'right ' }}>
                    {t('searchBar.episode')}
                  </Tag>
                );
                break;
              default:
                console.warn(`Unhandled nodeType ${nodeType}`);
                break;
            }
            break;
          case 'SERIES':
            key = `/series/${item.id}`;
            text = item.title;
            tag = (
              <Tag color="cyan" style={{ float: 'right ' }}>
                {t('searchBar.series')}
              </Tag>
            );
            break;
          default:
            console.warn(`Unhandled type ${type}`);
            break;
        }
        break;
      case 'Collection':
        key = `/collection/${item.slug}`;
        text = item.name;
        tag = (
          <Tag color="red" style={{ float: 'right ' }}>
            {t('searchBar.collection')}
          </Tag>
        );
        break;
      case 'NoResult':
        key = 'no-result';
        text = t('searchBar.noResult');
        break;
      default:
        console.warn(`Unhandled __typename ${typename}`);
        break;
    }
    return {
      key,
      disabled: typename === 'NoResult',
      type: typename,
      value: text,
      label: (
        <>
          {text} {tag}
        </>
      ),
    };
  };

  const searchResult = async (query) => {
    const words = query.trim().split(' ').map(getSearchableValue);
    let profiles = await listItems({
      apolloClient,
      query: listProfiles,
      queryName: 'listProfiles',
      variables: {
        filter: {
          and: words.map((word) => ({
            searchField: { contains: word },
          })),
        },
      },
      limit: DISPLAY_NUMBER,
    });
    profiles = profiles.map((p) => ({
      ...p,
      key: `/profile/${p.id}`,
    }));

    let videos = await listItems({
      apolloClient,
      query: listVideoNodesByStatusSortByTitle,
      queryName: 'listVideoNodesByStatusSortByTitle',
      variables: {
        status: consts.videos.status.PUBLISHED,
        filter: {
          and: words.map((word) => ({
            searchField: { contains: word },
          })),
        },
      },
      limit: DISPLAY_NUMBER,
    });
    videos = videos.map((v) => ({
      ...v,
      key: `/video/${v.id}`,
    }));

    let collections = await listItems({
      apolloClient,
      query: listCollections,
      queryName: 'listCollections',
      variables: {
        filter: {
          and: words.map((word) => ({
            searchField: { contains: word },
          })),
        },
      },
      limit: DISPLAY_NUMBER,
    });
    collections = collections.map((c) => ({
      ...c,
      key: `/collection/${c.slug}`,
    }));

    return [...profiles, ...videos, ...collections];
  };

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setSearching(true);
    const result = await searchResult(value);
    if (result.length > 0) setOptions(result);
    else {
      setOptions([{ __typename: 'NoResult' }]);
    }
    setSearching(false);
  };

  const handleClick = async (value, option) => {
    Router.push(option.key);
  };

  return (
    <SearchWrapper className="global-search-wrapper">
      <AutoComplete
        className="global-search"
        style={{ width: '100%' }}
        options={options.map(renderOption)}
        onSelect={handleClick}
        onSearch={debounce(handleSearch, 200)}
        placeholder={t('searchBar.placeholder')}
      >
        <Input
          suffix={
            searching ? (
              <LoadingOutlined style={{ marginRight: 0 }} />
            ) : (
              <SearchOutlined style={{ marginRight: 0 }} />
            )
          }
        />
      </AutoComplete>
    </SearchWrapper>
  );
};

export default SearchBar;
